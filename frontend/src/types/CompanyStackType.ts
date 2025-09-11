import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type CompanyStackParamList = {
  "Company Registration Data": undefined;
  "Company Registration Address": undefined;
  "Company Registration Profession": undefined;
  "Company Registration Password": undefined;
  "Login": undefined;
  "Company Scheduling": { id: number };
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

export interface CompanyRegistrationAddressProps {
  navigation: CompanyRegistrationAddressNavigationProp;
};

//Company Registration Profession
export type CompanyRegistrationProfessionNavigationProp = NativeStackNavigationProp<
  CompanyStackParamList,
  "Company Registration Profession"
>;

export interface CompanyRegistrationProfessionProps {
  navigation: CompanyRegistrationProfessionNavigationProp;
};

//Company Registration Password
export type CompanyRegistrationPasswordNavigationProp = NativeStackNavigationProp<
  CompanyStackParamList,
  "Company Registration Password"
>;

export interface CompanyRegistrationPasswordProps {
  navigation: CompanyRegistrationPasswordNavigationProp;
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