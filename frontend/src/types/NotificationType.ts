export type NotificationType =
  | "Cancelamento"
  | "Confirmação"
  | "Avaliação"
  | "Concluído"
  | "Lembrete";

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  date: string;
  professionId: number;
  professionName: string;
}