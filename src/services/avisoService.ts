import type { Aviso } from "../types/aviso";
import { avisosIniciais } from "../data/avisoMock";

const STORAGE_KEY = "mural_avisos";

export const carregarAvisos = (): Aviso[] => {
  const dados = localStorage.getItem(
    STORAGE_KEY
  );

  if (!dados) {
    return avisosIniciais;
  }

  return JSON.parse(dados);
};

export const salvarAvisos = (
  avisos: Aviso[]
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(avisos)
  );
};

export const limparAvisos = () => {
  localStorage.removeItem(
    STORAGE_KEY
  );
};