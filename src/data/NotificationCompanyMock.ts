import { Notification } from "../types/NotificationType";

export const NotificationsCompanyMock: Notification[] = [
    {
        id: 1,
        typeCompany: "À Definir",
        message: "Milena gostaria de um agendamento para o dia 28/08/2025 às 14:00.",
        date: "28/08/2025",
        address: "Rua das Flores, 123",
    },
    {
        id: 2,
        typeCompany: "Confirmado",
        message: "Você confirmou o atendimento com Milena no dia 30/08/2025 às 10:00.",
        date: "28/08/2025",
        address: "Rua das Flores, 123",
    },
    {
        id: 3,
        typeCompany: "Cancelado",
        message: "Você cancelou o atendimento com Amanda no dia 31/08/2025 às 15:00.",
        date: "29/08/2025",
        address: "Avenida Central, 456"
    },
    {
        id: 4,
        typeCompany: "Serviço Finalizado?",
        message: "A data prevista para a finalização do serviço para João Souza era 29/08/2025 ás 16:00. O serviço foi concluído?",
        date: "29/08/2025",
        address: "Rua das Acácias, 789"
    },
    {
        id: 5,
        typeCompany: "Concluído",
        message: "Você finalizou o seu serviço para Carlos Eduardo.",
        date: "29/08/2025",
        address: "Rua das Acácias, 789"
    },
    {
        id: 6,
        typeCompany: "Lembrete",
        message: "Você tem um agendamento com Ana Paula amanhã 30/08/2025 às 08:00.",
        date: "29/08/2025",
        address: "Avenida Brasil, 321"
    }
];