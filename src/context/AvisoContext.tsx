import { createContext, useContext, useState, useEffect } from "react";

import type { Aviso } from "../types/aviso";

import { carregarAvisos, salvarAvisos } from "../services/avisoService";

interface AvisoContextData {
  avisos: Aviso[];
  adicionarAviso: (aviso: Aviso) => void;
  excluirAviso: (id: number) => void;
  favoritarAviso: (id: number) => void;
}

const AvisoContext = createContext({} as AvisoContextData);

export function AvisoProvider({ children }: { children: React.ReactNode }) {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  useEffect(() => {
    setAvisos(carregarAvisos());
  }, []);

  useEffect(() => {
    salvarAvisos(avisos);
  }, [avisos]);

  const adicionarAviso = (aviso: Aviso) => {
    setAvisos((prev) => [...prev, aviso]);
  };

  const excluirAviso = (id: number) => {
    setAvisos((prev) => prev.filter((a) => a.id !== id));
  };

  const favoritarAviso = (id: number) => {
    setAvisos((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              favorito: !a.favorito,
            }
          : a,
      ),
    );
  };

  return (
    <AvisoContext.Provider
      value={{
        avisos,
        adicionarAviso,
        excluirAviso,
        favoritarAviso,
      }}
    >
      {children}
    </AvisoContext.Provider>
  );
}

export function useAvisos() {
  return useContext(AvisoContext);
}
