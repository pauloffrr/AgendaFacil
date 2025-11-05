import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type CompanyStackParamList = {
  "Company Registration Data": undefined;
  "Company Registration Address": {
    name: string;
    corporateReason: string;
    cnpj: string;
    rayKm: string;
    phone: string;
  };
  "Company Registration Profession": {
    name: string;
    corporateReason: string;
    cnpj: string;
    rayKm: string;
    phone: string;
    selectedState: string;
    selectedCity: string;
    street: string;
    number: string;
    complement: string;
  };
  "Company Registration Password": {
    name: string;
    corporateReason: string;
    cnpj: string;
    rayKm: string;
    phone: string;
    selectedState: string;
    selectedCity: string;
    street: string;
    number: string;
    complement: string;
    selectedCategory: string;
    selectedProfession: string;
  };
  "Login": undefined;
  "Company Scheduling": { id?: number };
  "Edit Event": { id: number };
  "Edit Schedule": undefined;
  "Company Notifications": undefined;
  "Reports": undefined;
};

//Company Registration Data
export type CompanyRegistrationDataNavigationProp = NativeStackNavigationProp<
  CompanyStackParamList,
  "Company Registration Data"
>;

export interface CompanyRegistrationDataProps {
  navigation: CompanyRegistrationDataNavigationProp;
};

//Company Registration Address
export type CompanyRegistrationAddressNavigationProp = NativeStackNavigationProp<
  CompanyStackParamList,
  "Company Registration Address"
>;

export type CompanyRegistrationAddressRouteProp = RouteProp<
  CompanyStackParamList,
  "Company Registration Address"
>;

export interface CompanyRegistrationAddressProps {
  navigation: CompanyRegistrationAddressNavigationProp;
  route: CompanyRegistrationAddressRouteProp;
};

//Company Registration Profession
export type CompanyRegistrationProfessionNavigationProp = NativeStackNavigationProp<
  CompanyStackParamList,
  "Company Registration Profession"
>;

export type CompanyRegistrationProfessionRouteProp = RouteProp<
  CompanyStackParamList,
  "Company Registration Profession"
>;

export interface CompanyRegistrationProfessionProps {
  navigation: CompanyRegistrationProfessionNavigationProp;
  route: CompanyRegistrationProfessionRouteProp;
};

//Company Registration Password
export type CompanyRegistrationPasswordNavigationProp = NativeStackNavigationProp<
  CompanyStackParamList,
  "Company Registration Password"
>;

export type CompanyRegistrationPasswordRouteProp = RouteProp<
  CompanyStackParamList,
  "Company Registration Password"
>;

export interface CompanyRegistrationPasswordProps {
  navigation: CompanyRegistrationPasswordNavigationProp;
  route: CompanyRegistrationPasswordRouteProp;
};

//Navigation Bar
export type CompanyNavigationProp =
  NativeStackNavigationProp<CompanyStackParamList>;

// Company Scheduling
export type CompanySchedulingNavigationProp = NativeStackNavigationProp<
  CompanyStackParamList,
  "Company Scheduling"
>;
export type CompanySchedulingRouteProp = RouteProp<
  CompanyStackParamList,
  "Company Scheduling"
>;
export interface CompanySchedulingProps {
  navigation: CompanySchedulingNavigationProp;
  route: CompanySchedulingRouteProp;
};

// Edit Event
export type CompanyEditEventNavigationProp = NativeStackNavigationProp<
  CompanyStackParamList,
  "Edit Event"
>;
export type CompanyEditEventRouteProp = RouteProp<
  CompanyStackParamList,
  "Edit Event"
>;
export interface CompanyEditEventProps {
  navigation: CompanyEditEventNavigationProp;
  route: CompanyEditEventRouteProp;
};

// Edit Schedule
export type CompanyEditScheduleNavigationProp = NativeStackNavigationProp<
  CompanyStackParamList,
  "Edit Schedule"
>;
export type CompanyEditScheduleRouteProp = RouteProp<
  CompanyStackParamList,
  "Edit Schedule"
>;
export interface CompanyEditScheduleProps {
  navigation: CompanyEditScheduleNavigationProp;
  route: CompanyEditScheduleRouteProp;
};