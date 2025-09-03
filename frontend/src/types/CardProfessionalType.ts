import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerStackParamList } from "./CustomerStackType";
import { Professional } from "./ProfessionalType";

export type CardProfessionalNavigationProp = NativeStackNavigationProp<CustomerStackParamList>;

export interface CardProfessionalProps {
  professional: Professional;
  onPress: () => void;
};