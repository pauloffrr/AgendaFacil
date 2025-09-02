import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type CustomerStackParamList = {
  "Customer Home": undefined;
  "Customer Notifications": undefined;
  "Customer Scheduling": undefined;
  "Favorites": undefined;
  "Customer Date": { id: number; name: string };
};

export type CustomerHomeNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Home"
>;

export interface HomeProps {
  navigation: CustomerHomeNavigationProp;
}