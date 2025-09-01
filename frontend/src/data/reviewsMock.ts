export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const reviewsMock: Review[] = [
    {
        id: 1,
        name: "João Silva",
        rating: 5,
        comment: "Ótima empresa, atenciosos e serviço impecável.",
        date: "10/08/2025"
    },
    {
        id: 2,
        name: "Maria Oliveira",
        rating: 4,
        comment: "Bom atendimento, mas o serviço demorou um pouco.",
        date: "13/08/2025"
    },
    {
        id: 3,
        name: "Carlos Souza",
        rating: 3,
        comment: "Serviço razoável, poderia ser melhor.",
        date: "20/08/2025"
    },
    {
        id: 4,
        name: "Ana Pereira",
        rating: 5,
        comment: "Excelente profissionalismo e qualidade!",
        date: "25/08/2025"
    },
    {
        id: 5,
        name: "Lucas Fernandes",
        rating: 4,
        comment: "Fiquei satisfeito com o serviço prestado. Fiquei satisfeito com o serviço prestado. Fiquei satisfeito com o serviço prestado.",
        date: "27/08/2025"
    }
];