import { SchedulingEventsProps } from "@/src/types/SchedulingEventsType";

export const generateRecurringEventsForDay = (
    baseEvents: SchedulingEventsProps[],
    targetDate: Date
): SchedulingEventsProps[] => {
    const targetDay = targetDate.getDate();
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();
    const targetDayOfWeek = targetDate.getDay();

    const isSameDay = (d1: Date, d2: Date) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();

    const generatedEvents: SchedulingEventsProps[] = [];

    for (const event of baseEvents) {
        if (!event.repeatScheduling || event.repeatScheduling === 'NO') {
            if (isSameDay(event.start, targetDate)) {
                generatedEvents.push(event);
            }
            continue;
        }

        if (event.start > targetDate) {
            continue;
        }

        let shouldInclude = false;

        switch (event.repeatScheduling) {
            case 'DAYS':
                shouldInclude = true;
                break;

            case 'WEEKS':
                if (event.start.getDay() === targetDayOfWeek) {
                    shouldInclude = true;
                }
                break;

            case 'MONTHS':
                if (event.start.getDate() === targetDay) {
                    shouldInclude = true;
                }
                break;

            case 'YEARS':
                if (event.start.getDate() === targetDay && event.start.getMonth() === targetMonth) {
                    shouldInclude = true;
                }
                break;
        }

        if (shouldInclude) {
            const newStart = new Date(targetYear, targetMonth, targetDay, event.start.getHours(), event.start.getMinutes());
            const newEnd = new Date(targetYear, targetMonth, targetDay, event.end.getHours(), event.end.getMinutes());
            
            const duration = event.end.getTime() - event.start.getTime();

            newEnd.setTime(newStart.getTime() + duration);

            generatedEvents.push({
                ...event,
                id: event.id,
                start: newStart,
                end: newEnd,
                title: `${event.title} (Recorrente)` 
            });
        }
    }

    return generatedEvents;
};

