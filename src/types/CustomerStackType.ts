import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type CustomerStackParamList = {
  "Customer Registration Data": undefined
  "Customer Registration Address": {
    name: string;
    phone: string;
    cpfValue: string;
  };
  "Customer Registration Password": {
    name: string;
    phone: string;
    cpfValue: string;
    selectedState: string;
    selectedCity: string;
    street: string;
    number: string;
    complement: string;
  };
  "Login": undefined;
  "Profile": undefined;
  "Customer Home": undefined;
  "Customer Notifications": undefined;
  "Customer Scheduling": undefined;
  "Favorites": { professionalId: number; };
  "Customer Date": { 
    nameCategory: string; 
    nameProfession: string;
  };
  "Professionals Available": { 
    nameCategory: string;
    nameProfession: string; 
    date: string; 
    startTime: string 
  };
  "Professional Profile": {
    professionalId: number;
    professionalName: string;
    professionName: string;
    date?: string;
    startTime?: string;
  };
};

//Login
export type LoginNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Login"
>;

export interface LoginProps {
  navigation: LoginNavigationProp;
  setUserType: (type: "CUSTOMER" | "COMPANY") => void;
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

export type CustomerRegistrationAddressRouteProp = RouteProp<
  CustomerStackParamList,
  "Customer Registration Address"
>;

export interface CustomerRegistrationAddressProps {
  navigation: CustomerRegistrationAddressNavigationProp;
  route: CustomerRegistrationAddressRouteProp;
};

//Customer Registration Password
export type CustomerRegistrationPasswordNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Registration Password"
>;

export type CustomerRegistrationPasswordRouteProp = RouteProp<
  CustomerStackParamList,
  "Customer Registration Password"
>;

export interface CustomerRegistrationPasswordProps {
  navigation: CustomerRegistrationPasswordNavigationProp;
  route: CustomerRegistrationPasswordRouteProp;
};

//Navigation Bar
export type CustomerNavigationProp =
  NativeStackNavigationProp<CustomerStackParamList>;

//Customer Home
export type HomeNavigationProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Customer Home"
>;
export type HomeRouteProp = RouteProp<CustomerStackParamList, "Customer Home">;

export interface HomeProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
};

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
};

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
};

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
};


// Favorites
export type FavoritesProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Favorites"
>;

export type FavoritesRouteProp = RouteProp<
  CustomerStackParamList,
  "Favorites"
>;

export interface FavoritesProps {
  navigation: FavoritesProp;
  route: FavoritesRouteProp;
};

// Profile
export type ProfileProp = NativeStackNavigationProp<
  CustomerStackParamList,
  "Profile"
>;

export type ProfileRouteProp = RouteProp<
  CustomerStackParamList,
  "Profile"
>;

export interface ProfileProps {
  navigation: ProfileProp;
  route: ProfileRouteProp;
};