import { ButtonProps } from "./ButtonType";
import { Notification } from "./NotificationType";

export interface ModalConfirmProps {
    notificationContext?: Notification;
    visible?: boolean;
    text: string;
    showTimeInput?: boolean;
    timeValue?: string;
    onPressTime?: () => void;
    buttonProps: ButtonProps;
    height?: number;
};