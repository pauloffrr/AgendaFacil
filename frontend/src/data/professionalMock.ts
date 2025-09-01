export interface Professional {
  id: number;
  name: string;
  professionId: number;
  mediaAvaliacao: number;
  precoMedio: number;
  img: any;
  cnpj: string;
  raioKm: number;
  telefone: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: number;
}

export const professionalMock: Professional[] = [
  { 
    id: 1,
    name: "João Silva",
    professionId: 1,
    mediaAvaliacao: 4.8,
    precoMedio: 175.49,
    img: require("../assets/profissional.webp"),
    cnpj: "11.111.111/0001-11",
    raioKm: 35,
    telefone: "(11) 91234-5678",
    estado: "PR",
    cidade: "Campo Mourão",
    rua: "Rua não sei oq lá",
    numero: 123,
  },
  {
    id: 2,
    name: "Maria Souza",
    professionId: 2,
    mediaAvaliacao: 4.5,
    precoMedio: 200.0,
    img: require("../assets/profissional.webp"),
    cnpj: "22.222.222/0001-22",
    raioKm: 30,
    telefone: "(11) 91111-2222",
    estado: "PR",
    cidade: "Campo Mourão",
    rua: "Rua não sei oq lá",
    numero: 124,
  },
  { 
    id: 3,
    name: "Carlos Oliveira",
    professionId: 3,
    mediaAvaliacao: 4.9,
    precoMedio: 150.75,
    img: require("../assets/profissional.webp"),
    cnpj: "33.333.333/0001-33",
    raioKm: 20,
    telefone: "(11) 92222-3333",
    estado: "PR",
    cidade: "Campo Mourão",
    rua: "Rua não sei oq lá",
    numero: 125,
  },
  { 
    id: 4,
    name: "Ana Pereira",
    professionId: 4,
    mediaAvaliacao: 4.7,
    precoMedio: 180.2,
    img: require("../assets/profissional.webp"),
    cnpj: "44.444.444/0001-44",
    raioKm: 25,
    telefone: "(11) 93333-4444",
    estado: "PR",
    cidade: "Campo Mourão",
    rua: "Rua não sei oq lá",
    numero: 126,
  },
];