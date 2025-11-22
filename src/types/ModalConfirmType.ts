import { ButtonProps } from "./ButtonType";

export interface ModalConfirmProps {
    visible?: boolean;
    text: string;
    showTimeInput?: boolean;
    timeValue?: string;
    onPressTime?: () => void;
    buttonProps: ButtonProps;
    height?: number;
};