import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const supabase = createAdminClient();

    // Fetch platform data as context
    const [{ data: projects }, { count: totalProjects }, { count: completedProjects }, { data: certs }] =
      await Promise.all([
        supabase
          .from("projects")
          .select("title, description, amount_rbtc, deadline_days, status")
          .eq("status", "open")
          .limit(5),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "completed"),
        supabase.from("certificates").select("student_id"),
      ]);

    const activeStudents = certs ? new Set(certs.map((c) => c.student_id)).size : 0;

    const context = `
Sos el asistente de Verus, una plataforma que conecta empresas con estudiantes mediante contratos de escrow en RSK blockchain.

Datos actuales de la plataforma:
- Total proyectos: ${totalProjects ?? 0}
- Proyectos completados: ${completedProjects ?? 0}
- Estudiantes activos: ${activeStudents}

Proyectos abiertos disponibles:
${projects && projects.length > 0
  ? projects.map((p) => `• ${p.title} — ${p.amount_rbtc} tRBTC — ${p.deadline_days} días`).join("\n")
  : "No hay proyectos abiertos por ahora."}

Respondé siempre en español, de forma concisa y amigable.
`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: context },
          ...messages,
        ],
        temperature: 0.5,
      }),
    });

    const data = await res.json();
    const response = data.choices?.[0]?.message?.content ?? "No pude generar una respuesta.";

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json({ response: "Error al procesar la consulta." }, { status: 500 });
  }
}
