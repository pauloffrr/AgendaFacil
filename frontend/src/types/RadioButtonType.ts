export interface RadioButtonProps {
    label: string;
    value: string;
    selectedValue: string;
    onSelect: (event: string) => void;
}