export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';


export interface Appointment {
id: number;
serviceId: number; // id do serviço
companyId: number; // id da empresa (dona do serviço)
userId: number; // id do cliente
startTime: Date; // data inicial
endTime: Date; // data final
status: AppointmentStatus;
notes?: string | null;
}