import { KeyboardTypeOptions } from "react-native";

export interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  onPressIn?: () => void;
};

export interface MaskInputProps extends InputProps {
  onChangeTextMask: (text: string, rawText: string) => void;
  mask: string;
};