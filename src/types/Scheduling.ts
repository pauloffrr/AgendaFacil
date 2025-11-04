export interface SchedulingProps {
  idScheduling: number;
  customerId: number | null;
  professionalId: number | null;
  profession: string | null;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  color?: string;
}