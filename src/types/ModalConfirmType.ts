import { ButtonProps } from "./ButtonType";
import { Notification } from "./NotificationType";

export type InputType = 'none' | 'time' | 'budget';

export interface ModalConfirmProps {
    notificationContext?: Notification;
    visible?: boolean;
    text: string;
    inputType?: InputType;
    timeValue?: string;
    onPressTime?: () => void;
    budget?: string;
    onChangeBudget?: (text: string) => void;
    buttonProps: ButtonProps;
    height?: number;
};