import { SchedulingEventsPros } from "@/src/types/SchedulingEventsType";

export const CustomerSchedulingMock: SchedulingEventsPros[] = [
  {
    id: 1,
    title: "Eletricista",
    start: new Date(2025, 8, 6, 8, 0),
    end: new Date(2025, 8, 6, 11, 0),
  },
  {
    id: 2,
    title: "Encanador",
    start: new Date(2025, 8, 7, 15, 0),
    end: new Date(2025, 8, 7, 16, 0),
  },
  {
    id: 3,
    title: "Pintor",
    start: new Date(2025, 8, 8, 13, 0),
    end: new Date(2025, 8, 8, 18, 0)
  }
]