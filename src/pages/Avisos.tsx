import { Search, Plus, Filter, Bell } from "lucide-react";
import { PostItCard } from "../components/PostItCard";
import cortichaImg from "../assets/images/postit.jpg";
import { useAvisos } from "../context/AvisoContext";
import { useState } from "react";
import type { Aviso } from "../types/aviso";
import { NovoAvisoModal } from "../components/NovoAvisoModal";
import { DetailModal } from "../components/DetailModal";

export default function Avisos() {
  const { avisos, favoritarAviso, excluirAviso, adicionarAviso } = useAvisos();

  const [modalNovo, setModalNovo] = useState(false);

  const [avisoDetalhe, setAvisoDetalhe] = useState<Aviso | null>(null);

  const [busca, setBusca] = useState("");

  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");

  const categorias = [
    "Todos",
    "Eventos",
    "Estágio",
    "Monitoria",
    "Venda de Livros",
    "Avisos Gerais",
  ];

  const avisosFiltrados = avisos.filter((aviso) => {
    const categoriaOk =
      categoriaFiltro === "Todos" || aviso.categoria === categoriaFiltro;

    const buscaOk = aviso.titulo.toLowerCase().includes(busca.toLowerCase());

    return categoriaOk && buscaOk;
  });

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex flex-col gap-3 p-4 bg-background border-b border-border">
        <div className="flex items-center justify-between">
          <h2>Avisos</h2>

          <button
            onClick={() => setModalNovo(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-primary-foreground"
          >
            <Plus size={16} />
            Novo
          </button>
        </div>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />

          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar aviso..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {categorias.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setCategoriaFiltro(cat)}
              className={`px-3 py-1 rounded-full ${
                categoriaFiltro === cat ? "bg-primary text-white" : "bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Filter size={14} />
          {avisosFiltrados.length} avisos
        </div>
      </div>

      <div className="flex justify-center p-6 bg-background">
        <div
          className="
      w-full
      max-w-9xl
      h-175
      overflow-y-auto
      rounded-3xl
      border-12 border-amber-900
      shadow-2xl
      p-8
    "
          style={{
            backgroundImage: `url(${cortichaImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {avisosFiltrados.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {avisosFiltrados.map((aviso: Aviso) => (
                <PostItCard
                  key={aviso.id}
                  aviso={aviso}
                  onFavoritar={favoritarAviso}
                  onExcluir={excluirAviso}
                  onVerDetalhes={setAvisoDetalhe}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-20">
              <Bell size={60} />
              <p>Nenhum aviso encontrado.</p>
            </div>
          )}
        </div>

        {modalNovo && (
          <NovoAvisoModal
            onClose={() => setModalNovo(false)}
            onSalvar={(novoAviso) => {
              adicionarAviso({
                id: Date.now(),
                data: new Date().toLocaleDateString("pt-BR"),
                favorito: false,
                ...novoAviso,
              });

              setModalNovo(false);
            }}
          />
        )}

        {avisoDetalhe && (
          <DetailModal
            aviso={avisoDetalhe}
            onClose={() => setAvisoDetalhe(null)}
            onFavoritar={favoritarAviso}
          />
        )}
      </div>
    </div>
  );
}
