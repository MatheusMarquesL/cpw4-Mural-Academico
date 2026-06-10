import { X, Calendar, Tag, Star } from "lucide-react";
import type { Aviso, Categoria } from "../types/aviso";

const categoriaEstilo: Record<Categoria, { bg: string; pin: string; text: string }> = {
  Eventos:          { bg: "#e9d5ff", pin: "#7c3aed", text: "#4c1d95" },
  "Estágio":        { bg: "#bfdbfe", pin: "#2563eb", text: "#1e40af" },
  Monitoria:        { bg: "#bbf7d0", pin: "#16a34a", text: "#14532d" },
  "Venda de Livros":{ bg: "#fef08a", pin: "#d97706", text: "#78350f" },
  "Avisos Gerais":  { bg: "#fecdd3", pin: "#e11d48", text: "#881337" },
};

interface DetailModalProps {
  aviso: Aviso;
  onClose: () => void;
  onFavoritar: (id: number) => void;
}

export function DetailModal({ aviso, onClose, onFavoritar }: DetailModalProps) {
  const estilo = categoriaEstilo[aviso.categoria];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-sm rounded-sm shadow-2xl pt-10 pb-6 px-6 flex flex-col gap-4"
        style={{
          backgroundColor: estilo.bg,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))",
        }}
      >
        {/* Push pin */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
            <circle cx="14" cy="12" r="11" fill={estilo.pin} />
            <circle cx="14" cy="12" r="6" fill="white" fillOpacity="0.35" />
            <rect x="13" y="22" width="2.5" height="12" rx="1.25" fill={estilo.pin} />
          </svg>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-black/10 transition-colors"
        >
          <X size={16} color={estilo.text} />
        </button>

        {/* Category badge */}
        <div className="flex items-center gap-1.5">
          <Tag size={13} color={estilo.pin} />
          <span className="text-xs font-medium" style={{ color: estilo.pin }}>
            {aviso.categoria}
          </span>
        </div>

        {/* Title */}
        <h2 style={{ color: "#1a1033", lineHeight: 1.3 }}>{aviso.titulo}</h2>

        {/* Ruled lines behind description */}
        <div className="relative">
          {[0,1,2,3,4,5,6,7].map((i) => (
            <div
              key={i}
              className="absolute w-full"
              style={{
                top: `${i * 22 + 11}px`,
                height: "1px",
                backgroundColor: `${estilo.pin}30`,
              }}
            />
          ))}
          <p
            className="relative z-10 text-sm leading-relaxed py-1"
            style={{ color: estilo.text }}
          >
            {aviso.descricao}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: estilo.text }}>
            <Calendar size={12} />
            {aviso.data}
          </span>
          <button
            onClick={() => onFavoritar(aviso.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all active:scale-95"
            style={{
              backgroundColor: aviso.favorito ? "#d97706" : estilo.pin,
              color: "#fff",
            }}
          >
            <Star size={12} fill={aviso.favorito ? "white" : "none"} color="white" />
            {aviso.favorito ? "Favoritado" : "Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}
