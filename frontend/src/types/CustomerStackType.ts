import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type CustomerStackParamList = {
  "Customer Home": undefined;
  "Customer Notifications": undefined;
  "Scheduling": undefined;
  "Favorites": undefined;
  "Customer Date": { id: number; name: string };
  "Professionals Available": { name: string } | { id: number };
  "Professional Profile": { id: number };
};

export type CustomerNavigationProp =
  NativeStackNavigationProp<CustomerStackParamList>;

export type HomeNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Home"
>;
export type HomeRouteProp = RouteProp<CustomerStackParamList, "Customer Home">;

export interface HomeProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

export type CustomerDateNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Date"
>;
export type CustomerDateRouteProp = RouteProp<
  CustomerStackParamList,
  "Customer Date"
>;
export interface CustomerDateProps {
  navigation: CustomerDateNavigationProp;
  route: CustomerDateRouteProp;
}