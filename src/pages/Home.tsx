import { BookOpen, Bell, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAvisos } from "../context/AvisoContext";

export default function Home() {
  const { avisos } = useAvisos();

  const meusFavoritos = avisos.filter((a) => a.favorito);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full px-6 py-8 gap-8">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30">
          <BookOpen size={44} className="text-primary-foreground" />
        </div>

        <div>
          <h1 className="mb-2">Mural Acadêmico Digital</h1>
          <p className="text-muted-foreground leading-relaxed">
            Compartilhe e encontre avisos importantes do campus.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-muted rounded-2xl p-4 border border-border">
          <div className="w-11 h-11 rounded-xl bg-violet-500 flex items-center justify-center">
            <Bell size={20} className="text-white" />
          </div>

          <div>
            <p>{avisos.length} avisos publicados</p>
            <p className="text-xs text-muted-foreground">
              Acesse a aba Avisos para ver todos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-muted rounded-2xl p-4 border border-border">
          <div className="w-11 h-11 rounded-xl bg-amber-400 flex items-center justify-center">
            <Star size={20} fill="white" className="text-white" />
          </div>

          <div>
            <p>{meusFavoritos.length} favoritos salvos</p>
            <p className="text-xs text-muted-foreground">Veja em Meus Avisos</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/avisos")}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground"
      >
        Entrar no Mural
      </button>
    </div>
  );
}
