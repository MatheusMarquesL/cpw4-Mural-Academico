import { useRef, useState, useCallback } from "react";
import { Star, Trash2 } from "lucide-react";

import type { Aviso, Categoria } from "../types/aviso";

function getRotation(id: number): number {
  const str = id.toString();

  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return (hash % 17) - 8;
}

function getSize(id: number): string {
  switch (id % 4) {
    case 0:
      return "min-h-40";
    case 1:
      return "min-h-48";
    case 2:
      return "min-h-56";
    default:
      return "min-h-44";
  }
}

function getIconColor(categoria: Categoria): string {
  switch (categoria) {
    case "Eventos":
      return "#4c1d95";

    case "Estágio":
      return "#1e40af";

    case "Monitoria":
      return "#14532d";

    case "Venda de Livros":
      return "#78350f";

    case "Avisos Gerais":
      return "#881337";

    default:
      return "#111827";
  }
}

const categoriaEstilo: Record<
  Categoria,
  { bg: string; pin: string; lines: string }
> = {
  Eventos: { bg: "#e9d5ff", pin: "#7c3aed", lines: "#d8b4fe" },
  Estágio: { bg: "#bfdbfe", pin: "#2563eb", lines: "#93c5fd" },
  Monitoria: { bg: "#bbf7d0", pin: "#16a34a", lines: "#86efac" },
  "Venda de Livros": { bg: "#fef08a", pin: "#d97706", lines: "#fde047" },
  "Avisos Gerais": { bg: "#fecdd3", pin: "#e11d48", lines: "#fda4af" },
};

interface PostItCardProps {
  aviso: Aviso;
  onFavoritar: (id: number) => void;
  onExcluir: (id: number) => void;
  onVerDetalhes: (aviso: Aviso) => void;
}

export function PostItCard({
  aviso,
  onFavoritar,
  onExcluir,
  onVerDetalhes,
}: PostItCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shaking, setShaking] = useState(false);
  const rot = getRotation(aviso.id);
  const estilo = categoriaEstilo[aviso.categoria];
  const tamanho = getSize(aviso.id);

  const iconColor = getIconColor(aviso.categoria);

  const handleVerDetalhes = useCallback(() => {
    if (shaking) return;
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      onVerDetalhes(aviso);
    }, 520);
  }, [shaking, aviso, onVerDetalhes]);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col select-none ${shaking ? "postit-shake" : "postit-sway"}`}
      style={
        {
          "--rot": `${rot}deg`,
          transform: `rotate(${rot}deg)`,
          filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.22))",
        } as React.CSSProperties
      }
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
          <circle cx="11" cy="10" r="9" fill={estilo.pin} />
          <circle cx="11" cy="10" r="5" fill="white" fillOpacity="0.35" />
          <rect x="10" y="18" width="2" height="10" rx="1" fill={estilo.pin} />
        </svg>
      </div>

      <div
        className={`pt-8 pb-4 px-4 rounded-sm flex flex-col gap-2 ${tamanho}`}
        style={{ backgroundColor: estilo.bg }}
      >
        <div className="absolute inset-x-4 top-16 bottom-4 pointer-events-none overflow-hidden">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute w-full"
              style={{
                top: `${i * 22}px`,
                height: "1px",
                backgroundColor: estilo.lines,
              }}
            />
          ))}
        </div>

        <h4
          className="relative z-10 leading-snug pr-12"
          style={{ color: "#1a1033" }}
        >
          {aviso.titulo}
        </h4>

        <p
          className="relative z-10 text-xs leading-relaxed line-clamp-3 flex-1"
          style={{ color: "#44337a" }}
        >
          {aviso.descricao}
        </p>

        <div className="relative z-10 flex items-center justify-between mt-1 gap-2">
          <span className="text-xs" style={{ color: "#6b46c1" }}>
            {aviso.data}
          </span>
          <button
            onClick={handleVerDetalhes}
            className="text-xs px-2.5 py-1 rounded-full transition-all active:scale-95"
            style={{
              backgroundColor: estilo.pin,
              color: "#fff",
            }}
          >
            Ver mais
          </button>
        </div>
      </div>

      <div className="absolute top-6 right-2 flex flex-col gap-1 z-10">
        <button
          onClick={() => onFavoritar(aviso.id)}
          className="
              p-1.5
              rounded-full
              bg-white/40
              backdrop-blur-sm
              hover:bg-white/70
              transition-all
              active:scale-90
            "
          title={aviso.favorito ? "Remover favorito" : "Favoritar"}
        >
          <Star
            size={15}
            color={aviso.favorito ? "#d97706" : "#9ca3af"}
            fill={aviso.favorito ? "#d97706" : "none"}
          />
        </button>
        <button
          onClick={() => onExcluir(aviso.id)}
          className="
              p-1.5
              rounded-full
              bg-white/40
              backdrop-blur-sm
              hover:bg-white/70
              transition-all
              active:scale-90
            "
          title="Excluir"
        >
          <Trash2 size={15} color="#9ca3af" />
        </button>
      </div>
    </div>
  );
}
