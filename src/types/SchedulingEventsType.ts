export type StatusType = 
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED"
    | "BLOCKED";

export type RepeatSchedulingType =
    | "NO"
    | "DAYS"
    | "WEEKS"
    | "MONTHS"
    | "YEARS";

export interface SchedulingEventsProps {
    id: number;
    idSchedulingCompany: number;
    name: string
    companyId: number;
    customerId: number;
    schedulingCustomerId: number;
    title: string;
    start: Date;
    end: Date;
    startDate: string;
    endDate: string;
    startHour: string;
    endHour: string;
    profession: string;
    status: StatusType;
    repeatScheduling: RepeatSchedulingType;
}