export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
}

export interface ItemOrcamento {
  id: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface Orcamento {
  id: string;
  numero: string;
  cliente: Cliente;
  itens: ItemOrcamento[];
  valorTotal: number;
  status: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise';
  dataEmissao: string;
  validade: string;
  observacoes?: string;
}

export interface MetricasDashboard {
  faturamentoMensal: number;
  totalServicos: number;
  clientesEmDebito: number;
  orcamentosPendentes: number;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  empresa: string;
}
