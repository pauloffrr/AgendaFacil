import { Notification } from "../types/NotificationType";

export const NotificationsCustomerMock: Notification[] = [
    {
        id: 1,
        typeCustomer: "Cancelamento",
        message: "João Silva cancelou seu agendamento para o dia 28/08/2025 às 14:00.",
        date: "28/08/2025",
        professionId: 1,
        professionName: "Eletricista"
    },
    {
        id: 2,
        typeCustomer: "Confirmação",
        message: "Maria Oliveira confirmou seu agendamento para o dia 30/08/2025 às 10:00.",
        date: "28/08/2025",
        professionId: 32,
        professionName: "Cabeleireiro"
    },
    {
        id: 3,
        typeCustomer: "Avaliação",
        message: "João Souza finalizou o seu serviço agendado, deseja avaliar?",
        date: "29/08/2025",
        professionId: 3,
        professionName: "Pintor"
    },
    {
        id: 4,
        typeCustomer: "Concluído",
        message: "João Souza finalizou o seu serviço agendado.",
        date: "29/08/2025",
        professionId: 3,
        professionName: "Pintor"
    },
    {
        id: 5,
        typeCustomer: "Lembrete",
        message: "Você tem um agendamento com Ana Paula amanhã 30/08/2025 às 08:00.",
        date: "29/08/2025",
        professionId: 19,
        professionName: "Diarista"
    }
];