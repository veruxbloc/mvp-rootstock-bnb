export interface Dataset {
  id: string;
  name: string;
  description: string;
  fundedAmount: number;
  fundingGoal: number;
  tokenPrice: number;
  tokensAvailable: number;
  totalTokens: number;
  tags: string[];
}

export const mockDatasets: Dataset[] = [
  {
    id: "ds-1",
    name: "Matías García",
    description: "Desarrollador Full Stack con especialización en Smart Contracts y DeFi. Más de 3 proyectos blockchain en producción, egresado de la UTN con mención de honor.",
    fundedAmount: 16250,
    fundingGoal: 25000,
    tokenPrice: 25,
    tokensAvailable: 350,
    totalTokens: 1000,
    tags: ["Solidity", "Full Stack", "DeFi"],
  },
  {
    id: "ds-2",
    name: "Valentina Cruz",
    description: "Diseñadora UX/UI especializada en productos Web3 y apps móviles. Ganadora del hackathon Blockchain Latam 2025, con experiencia en 5 startups del ecosistema.",
    fundedAmount: 14400,
    fundingGoal: 18000,
    tokenPrice: 40,
    tokensAvailable: 90,
    totalTokens: 450,
    tags: ["UX/UI", "Web3", "Mobile"],
  },
  {
    id: "ds-3",
    name: "Lucas Fernández",
    description: "Especialista en Smart Contracts y protocolos DeFi. Auditor de seguridad certificado, con foco en el ecosistema Ethereum y Polkadot.",
    fundedAmount: 5600,
    fundingGoal: 20000,
    tokenPrice: 15,
    tokensAvailable: 960,
    totalTokens: 1333,
    tags: ["Smart Contracts", "Rust", "Seguridad"],
  },
];
