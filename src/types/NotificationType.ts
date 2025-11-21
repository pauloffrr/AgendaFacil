export type NotificationType =
  | "Pendente"
  | "Confirmado"
  | "Cancelado"
  | "Serviço Finalizado?"
  | "Lembrete"
  | "Concluído"
  | "Avaliação";

export interface Notification {
  idNotificationCustomer: number;
  idNotificationCompany: number;
  customerId: number;
  companyId: number;
  type: NotificationType;
  text: string;
  schedulingDate: string;
  schedulingStartTime: string;
  schedulingEndTime: string;
  date: string;
  profession?: string;
  company?: {
    idCompany: number;
    name: string;
    profession: string;
    street: string;
    number: number;
    phone: string;
  };
  customer?: {
    idCustomer: number;
    name: string;
    street: string;
    number: number;
    phone: string;
  }
};