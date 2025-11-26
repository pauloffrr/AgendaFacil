export interface RadioButtonProps {
    label: string;
    value: string;
    selectedValue: string;
    onSelect: (event: string) => void;
}

export interface ValueProps {
    value: string;
    onChangeValue: (string: string) => void;
}