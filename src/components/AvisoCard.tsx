import { Star, Trash2, Calendar, Tag } from "lucide-react";
import type { Aviso, Categoria } from "../types/aviso";

const categoriaCores: Record<Categoria, string> = {
  Eventos: "bg-purple-500/15 text-purple-600 dark:text-purple-300",
  Estágio: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
  Monitoria: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  "Venda de Livros": "bg-orange-500/15 text-orange-600 dark:text-orange-300",
  "Avisos Gerais": "bg-violet-500/15 text-violet-600 dark:text-violet-300",
};

interface AvisoCardProps {
  aviso: Aviso;
  onFavoritar: (id: number) => void;
  onExcluir: (id: number) => void;
}

export function AvisoCard({ aviso, onFavoritar, onExcluir }: AvisoCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex-1 leading-snug">{aviso.titulo}</h3>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onFavoritar(aviso.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              aviso.favorito
                ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                : "text-muted-foreground hover:text-yellow-500 hover:bg-yellow-50"
            }`}
            title={aviso.favorito ? "Remover favorito" : "Favoritar"}
          >
            <Star size={16} fill={aviso.favorito ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => onExcluir(aviso.id)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-red-50 transition-colors"
            title="Excluir aviso"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
        {aviso.descricao}
      </p>

      <div className="flex items-center justify-between gap-2 pt-1">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs ${categoriaCores[aviso.categoria]}`}
        >
          <Tag size={11} />
          {aviso.categoria}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar size={11} />
          {aviso.data}
        </span>
      </div>
    </div>
  );
}
