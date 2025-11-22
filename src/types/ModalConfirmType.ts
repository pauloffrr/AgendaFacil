import { ButtonProps } from "./ButtonType";

export interface ModalConfirmProps {
    visible?: boolean;
    text: string;
    content?: React.ReactNode;
    buttonProps: ButtonProps;
    height?: number;
};