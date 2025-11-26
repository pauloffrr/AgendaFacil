export interface SchedulingProps {
    idScheduling: number;
    title: string;
    startDate: string;
    startHour: string;
    endDate: string;
    endHour: string;
    status: string;
    repeatScheduling: string;
    color?: string;

    company: {
        idCompany: number;
        name: string;
        profession: string;
        street: string;
        number: number;
        phone: string;
    };

    customer: {
        idCustomer: number;
        name: string;
    };
}