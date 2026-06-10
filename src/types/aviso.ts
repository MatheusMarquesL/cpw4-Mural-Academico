export type Categoria =
  | "Eventos"
  | "Estágio"
  | "Monitoria"
  | "Venda de Livros"
  | "Avisos Gerais";

export interface Aviso {
  id: number;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  data: string;
  favorito?: boolean;
}