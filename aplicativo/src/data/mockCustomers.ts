export interface Customer {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  plano: string;
  valorMensal: number;
  tempoContrato: number; // meses
  ultimoContato: string;
  satisfacao: number; // 1-5
  chamadosAbertos: number;
  atrasosPagamento: number;
  churnProbability: number;
  motivosChurn: string[];
  acoesRecomendadas: string[];
}

export const mockCustomers: Customer[] = [
  {
    id: "1",
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 99999-1234",
    plano: "Premium",
    valorMensal: 299.90,
    tempoContrato: 24,
    ultimoContato: "2024-01-15",
    satisfacao: 2,
    chamadosAbertos: 5,
    atrasosPagamento: 2,
    churnProbability: 0.89,
    motivosChurn: ["Insatisfação com atendimento", "Preço elevado", "Problemas técnicos recorrentes"],
    acoesRecomendadas: ["Oferecer desconto de 20%", "Agendar visita técnica", "Migrar para plano com melhor custo-benefício"]
  },
  {
    id: "2",
    nome: "João Santos",
    email: "joao.santos@empresa.com",
    telefone: "(21) 98888-5678",
    plano: "Empresarial",
    valorMensal: 599.90,
    tempoContrato: 12,
    ultimoContato: "2024-01-20",
    satisfacao: 3,
    chamadosAbertos: 3,
    atrasosPagamento: 1,
    churnProbability: 0.72,
    motivosChurn: ["Concorrência com preço menor", "Velocidade abaixo do contratado"],
    acoesRecomendadas: ["Upgrade de velocidade sem custo adicional", "Apresentar benefícios exclusivos do plano"]
  },
  {
    id: "3",
    nome: "Ana Oliveira",
    email: "ana.oliveira@gmail.com",
    telefone: "(31) 97777-9012",
    plano: "Básico",
    valorMensal: 99.90,
    tempoContrato: 36,
    ultimoContato: "2024-01-10",
    satisfacao: 4,
    chamadosAbertos: 1,
    atrasosPagamento: 0,
    churnProbability: 0.25,
    motivosChurn: ["Possível interesse em plano concorrente"],
    acoesRecomendadas: ["Oferecer upgrade com desconto promocional"]
  },
  {
    id: "4",
    nome: "Carlos Ferreira",
    email: "carlos.ferreira@corp.com",
    telefone: "(41) 96666-3456",
    plano: "Premium",
    valorMensal: 299.90,
    tempoContrato: 6,
    ultimoContato: "2024-01-22",
    satisfacao: 1,
    chamadosAbertos: 8,
    atrasosPagamento: 3,
    churnProbability: 0.95,
    motivosChurn: ["Múltiplos chamados não resolvidos", "Atrasos frequentes no pagamento", "Insatisfação geral"],
    acoesRecomendadas: ["Contato urgente da gerência", "Proposta de renegociação", "Solução prioritária dos chamados"]
  },
  {
    id: "5",
    nome: "Beatriz Costa",
    email: "beatriz.costa@outlook.com",
    telefone: "(51) 95555-7890",
    plano: "Intermediário",
    valorMensal: 179.90,
    tempoContrato: 18,
    ultimoContato: "2024-01-18",
    satisfacao: 3,
    chamadosAbertos: 2,
    atrasosPagamento: 0,
    churnProbability: 0.45,
    motivosChurn: ["Preço vs. benefícios", "Interesse em planos de streaming inclusos"],
    acoesRecomendadas: ["Incluir combo de streaming", "Apresentar novos benefícios do plano"]
  },
  {
    id: "6",
    nome: "Ricardo Lima",
    email: "ricardo.lima@tech.com",
    telefone: "(61) 94444-2345",
    plano: "Empresarial",
    valorMensal: 799.90,
    tempoContrato: 48,
    ultimoContato: "2024-01-05",
    satisfacao: 5,
    chamadosAbertos: 0,
    atrasosPagamento: 0,
    churnProbability: 0.08,
    motivosChurn: [],
    acoesRecomendadas: ["Manter relacionamento", "Programa de fidelidade VIP"]
  },
  {
    id: "7",
    nome: "Fernanda Almeida",
    email: "fernanda.almeida@mail.com",
    telefone: "(71) 93333-6789",
    plano: "Básico",
    valorMensal: 99.90,
    tempoContrato: 8,
    ultimoContato: "2024-01-12",
    satisfacao: 2,
    chamadosAbertos: 4,
    atrasosPagamento: 1,
    churnProbability: 0.78,
    motivosChurn: ["Qualidade do sinal instável", "Demora no atendimento"],
    acoesRecomendadas: ["Visita técnica gratuita", "Crédito na próxima fatura"]
  },
  {
    id: "8",
    nome: "Paulo Mendes",
    email: "paulo.mendes@business.com",
    telefone: "(81) 92222-0123",
    plano: "Premium",
    valorMensal: 349.90,
    tempoContrato: 30,
    ultimoContato: "2024-01-25",
    satisfacao: 4,
    chamadosAbertos: 1,
    atrasosPagamento: 0,
    churnProbability: 0.18,
    motivosChurn: ["Nenhum motivo identificado"],
    acoesRecomendadas: ["Renovação antecipada com benefícios"]
  }
];

export const dashboardStats = {
  totalClientes: 12450,
  clientesRisco: 2340,
  taxaChurn: 18.8,
  retencaoMes: 245,
  receitaEmRisco: 456780,
  satisfacaoMedia: 3.4,
  churnPorMotivo: [
    { motivo: "Preço", porcentagem: 35 },
    { motivo: "Atendimento", porcentagem: 28 },
    { motivo: "Qualidade", porcentagem: 22 },
    { motivo: "Concorrência", porcentagem: 15 },
  ],
  churnMensal: [
    { mes: "Ago", churn: 15.2, retidos: 180 },
    { mes: "Set", churn: 16.8, retidos: 195 },
    { mes: "Out", churn: 17.5, retidos: 210 },
    { mes: "Nov", churn: 18.2, retidos: 225 },
    { mes: "Dez", churn: 19.1, retidos: 235 },
    { mes: "Jan", churn: 18.8, retidos: 245 },
  ],
  riscoPorPlano: [
    { plano: "Básico", risco: 25, total: 4200 },
    { plano: "Intermediário", risco: 18, total: 3800 },
    { plano: "Premium", risco: 12, total: 2950 },
    { plano: "Empresarial", risco: 8, total: 1500 },
  ],
};
