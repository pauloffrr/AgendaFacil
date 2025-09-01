import { State, City } from "../types/address";

const BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";

export async function getStates(): Promise<State[]> {
  const response = await fetch(`${BASE_URL}/estados`);
  const data: State[] = await response.json();
  return data.sort((a, b) => a.nome.localeCompare(b.nome));
}

export async function getCitiesByState(stateId: string): Promise<City[]> {
  const response = await fetch(`${BASE_URL}/estados/${stateId}/municipios`);
  const data: City[] = await response.json();
  return data.sort((a, b) => a.nome.localeCompare(b.nome));
}