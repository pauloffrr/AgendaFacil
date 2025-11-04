export type NotificationCustomerType =
  | "Cancelamento"
  | "Confirmação"
  | "Avaliação"
  | "Concluído"
  | "Lembrete";

  export type NotificationCompanyType =
  | "À Definir"
  | "Confirmado"
  | "Cancelado"
  | "Serviço Finalizado?"
  | "Concluído"
  | "Lembrete";

export interface Notification {
  id: number;
  typeCustomer?: NotificationCustomerType;
  typeCompany?: NotificationCompanyType;
  message: string;
  date: string;
  professionId?: number;
  professionName?: string;
  address?: string;
};