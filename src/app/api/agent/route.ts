import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const supabase = createAdminClient();

const getOpenProjects = tool(
  async () => {
    const { data } = await supabase
      .from("projects")
      .select("id, title, description, amount_rbtc, deadline_days, status, companies(name)")
      .eq("status", "open")
      .order("created_at", { ascending: false })
      .limit(10);
    return JSON.stringify(data ?? []);
  },
  {
    name: "get_open_projects",
    description: "Obtiene la lista de proyectos abiertos disponibles en la plataforma",
    schema: z.object({}),
  }
);

const getPlatformStats = tool(
  async () => {
    const [{ count: totalProjects }, { count: completedProjects }, { data: certs }] =
      await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "completed"),
        supabase.from("certificates").select("student_id"),
      ]);

    const activeStudents = certs ? new Set(certs.map((c) => c.student_id)).size : 0;

    return JSON.stringify({ totalProjects, completedProjects, activeStudents });
  },
  {
    name: "get_platform_stats",
    description: "Obtiene estadísticas generales de la plataforma: proyectos, estudiantes activos, proyectos completados",
    schema: z.object({}),
  }
);

const findStudents = tool(
  async ({ keyword }: { keyword: string }) => {
    const { data } = await supabase
      .from("students")
      .select("name, university, career, certificates(name, institution)")
      .ilike("career", `%${keyword}%`)
      .limit(5);
    return JSON.stringify(data ?? []);
  },
  {
    name: "find_students",
    description: "Busca estudiantes por carrera o especialidad. Útil para encontrar talento para un proyecto.",
    schema: z.object({
      keyword: z.string().describe("Palabra clave para buscar (ej: 'React', 'diseño', 'ingeniería')"),
    }),
  }
);

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const llm = new ChatOpenAI({
      modelName: "openai/gpt-4o-mini",
      openAIApiKey: process.env.OPENROUTER_API_KEY,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    });

    const agent = createReactAgent({
      llm,
      tools: [getOpenProjects, getPlatformStats, findStudents],
      messageModifier: `Sos un asistente inteligente de Verus, una plataforma que conecta empresas con estudiantes mediante contratos de escrow en RSK blockchain.
Podés consultar proyectos disponibles, estadísticas de la plataforma y buscar estudiantes.
Respondé siempre en español, de forma concisa y clara.`,
    });

    const lastMessage = messages[messages.length - 1];

    const result = await agent.invoke({
      messages: [new HumanMessage(lastMessage.content)],
    });

    const last = result.messages[result.messages.length - 1];
    const response = typeof last.content === "string" ? last.content : JSON.stringify(last.content);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json(
      { response: "Error al procesar la consulta." },
      { status: 500 }
    );
  }
}
