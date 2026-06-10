import { Trash2, Wifi, WifiOff } from "lucide-react";
import { PostItCard } from "../components/PostItCard";

export default function MeusAvisos({
  avisos,
  meusFavoritos,
  online,
  handleFavoritar,
  handleExcluir,
  setAvisoDetalhe,
  handleLimparDados,
}: any) {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h2>Meus Avisos</h2>
        <p className="text-sm text-muted-foreground">
          Favoritos e configurações
        </p>
      </div>

      <div className="bg-muted rounded-2xl p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Total de avisos</p>
            <strong>{avisos.length}</strong>
          </div>

          <div>
            <p>Favoritos</p>
            <strong>{meusFavoritos.length}</strong>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {online ? <Wifi size={16} /> : <WifiOff size={16} />}
          <span>
            {online
              ? "Online — sincronizado"
              : "Offline — dados locais"}
          </span>
        </div>
      </div>

      <div>
        <h3>Favoritos ({meusFavoritos.length})</h3>

        <div className="grid grid-cols-2 gap-6 mt-4">
          {meusFavoritos.map((aviso: any) => (
            <PostItCard
              key={aviso.id}
              aviso={aviso}
              onFavoritar={handleFavoritar}
              onExcluir={handleExcluir}
              onVerDetalhes={setAvisoDetalhe}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleLimparDados}
        className="flex items-center justify-center gap-2 py-3 border rounded-2xl"
      >
        <Trash2 size={16} />
        Limpar todos os dados
      </button>
    </div>
  );
}