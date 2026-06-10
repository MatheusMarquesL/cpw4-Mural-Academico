import { useState } from "react";
import { X } from "lucide-react";
import type { Aviso, Categoria } from "../types/aviso";

const CATEGORIAS: Categoria[] = [
  "Eventos",
  "Estágio",
  "Monitoria",
  "Venda de Livros",
  "Avisos Gerais",
];

interface NovoAvisoModalProps {
  onClose: () => void;
  onSalvar: (aviso: Omit<Aviso, "id" | "data" | "favorito">) => void;
}

export function NovoAvisoModal({ onClose, onSalvar }: NovoAvisoModalProps) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("Avisos Gerais");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      setErro("Preencha todos os campos.");
      return;
    }
    onSalvar({ titulo: titulo.trim(), descricao: descricao.trim(), categoria });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2>Novo Aviso</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              type="text"
              placeholder="Ex: Venda de livros de cálculo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              rows={4}
              placeholder="Descreva o aviso com detalhes..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Categoria)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {erro && <p className="text-destructive text-sm">{erro}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
