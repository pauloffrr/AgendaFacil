import { SchedulingEventsPros } from "@/src/types/SchedulingEventsType"

export const CompanySchedulingMock: SchedulingEventsPros[] = [
    {
        id: 1,
        title: "Milena - Rua Teste, 70",
        start: new Date(2025, 8, 10, 8, 0),
        end: new Date(2025, 8, 10, 11, 0)
    },
    {
        id: 2,
        title: "Amanda - Rua Teste, 224",
        start: new Date(2025, 8, 10, 15, 0),
        end: new Date(2025, 8, 10, 16, 0),
    },
    {
        id: 3,
        title: "Alana - Rua Teste, 87",
        start: new Date(2025, 8, 10, 16, 30),
        end: new Date(2025, 8, 10, 18, 0)
    }
]