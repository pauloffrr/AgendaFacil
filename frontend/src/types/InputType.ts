import { KeyboardTypeOptions } from "react-native";

export interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType: KeyboardTypeOptions;
  mask: string;
  onPressIn: () => void;
  selectedState: string;
  setSelectedState: (stateId: string) => void;
  selectedCity: string;
  setSelectedCity: (cityName: string) => void;
}