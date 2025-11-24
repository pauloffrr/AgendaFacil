export interface TimeInputProps {
    startTime: Date | null;
    endTime: Date | null;
    onChangeStartTime: (date: Date) => void;
    onChangeEndTime: (date: Date) => void;
}