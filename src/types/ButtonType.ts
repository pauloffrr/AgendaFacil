import { GestureResponderEvent } from "react-native";
import { Notification } from "./NotificationType";

export interface ButtonProps {
    onPress?: (event: GestureResponderEvent) => void;
    buttonText?: string;
    
    firstButtonText?: string;
    secondButtonText?: string;
    firstButtonColor?: string;
    secondButtonColor?: string;
    firstTextColor?: string;
    secondTextColor?: string;
    firstOnPress?: (notification?: Notification) => void;
    secondOnPress?: () => void;
};