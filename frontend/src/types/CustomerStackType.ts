import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type CustomerStackParamList = {
  "Customer Registration Data": undefined;
  "Customer Registration Address": undefined;
  "Customer Registration Password": undefined;
  Login: undefined;
};

export type CustomerRegistrationDataNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Registration Data"
>;

export type CustomerRegistrationAddressNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Registration Address"
>;

export type CustomerRegistrationPasswordNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Registration Password"
>;

export interface CustomerRegistrationDataProps {
  navigation: CustomerRegistrationDataNavigationProp;
}

export interface CustomerRegistrationAddressProps {
  navigation: CustomerRegistrationAddressNavigationProp;
}

export interface CustomerRegistrationPasswordProps {
  navigation: CustomerRegistrationPasswordNavigationProp;
}