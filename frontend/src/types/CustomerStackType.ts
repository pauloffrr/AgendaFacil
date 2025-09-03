import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type CustomerStackParamList = {
  "Customer Registration Data": undefined;
  "Customer Registration Address": undefined;
  "Customer Registration Password": undefined;
  "Login": undefined;
  "Customer Home": undefined;
  "Customer Notifications": undefined;
  "Scheduling": undefined;
  "Favorites": undefined;
  "Customer Date": { id: number; name: string };
  "Professionals Available": { id: number; name: string };
  "Professional Profile": { id: number };
};

//Login
export type LoginNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Login"
>;

export interface LoginProps {
  navigation: LoginNavigationProp;
}

//Customer Registration Data
export type CustomerRegistrationDataNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Registration Data"
>;

export interface CustomerRegistrationDataProps {
  navigation: CustomerRegistrationDataNavigationProp;
}

//Customer Registration Address
export type CustomerRegistrationAddressNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Registration Address"
>;

export interface CustomerRegistrationAddressProps {
  navigation: CustomerRegistrationAddressNavigationProp;
}

//Customer Registration Password
export type CustomerRegistrationPasswordNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Registration Password"
>;

export interface CustomerRegistrationPasswordProps {
  navigation: CustomerRegistrationPasswordNavigationProp;
}

//Customer Home
export type HomeNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Home"
>;
export type HomeRouteProp = RouteProp<CustomerStackParamList, "Customer Home">;

export interface HomeProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

//Customer Date
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

// Professionals Available
export type ProfessionalsAvailableNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Professionals Available"
>;

export type ProfessionalsAvailableRouteProp = RouteProp<
  CustomerStackParamList,
  "Professionals Available"
>;

export interface ProfessionalsAvailableProps {
  navigation: ProfessionalsAvailableNavigationProp;
  route: ProfessionalsAvailableRouteProp;
}

// Professional Profile
export type ProfessionalProfileNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Professional Profile"
>;

export type ProfessionalProfileRouteProp = RouteProp<
  CustomerStackParamList,
  "Professional Profile"
>;

export interface ProfessionalProfileProps {
  navigation: ProfessionalProfileNavigationProp;
  route: ProfessionalProfileRouteProp;
}