import { GestureResponderEvent } from "react-native";

export interface ButtonProps {
    onPress?: (event: GestureResponderEvent) => void;
    buttonText?: string;
    
    firstButtonText?: string;
    secondButtonText?: string;
    firstButtonColor?: string;
    secondButtonColor?: string;
    firstTextColor?: string;
    secondTextColor?: string;
    firstOnPress?: (event: GestureResponderEvent) => void;
    secondOnPress?: (event: GestureResponderEvent) => void;
};