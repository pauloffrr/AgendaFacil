import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUser } from "../context/UserContext";
import { LoginScreen } from "../screens/LoginScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { CustomerRegistrationData } from "../screens/Customer/DataRegistration";
import { CustomerRegistrationAddress } from "../screens/Customer/AddressRegistration";
import { CustomerRegistrationPassword } from "../screens/Customer/PasswordRegistration";
import { CustomerHome } from "../screens/Customer/Home";
import { CustomerDate } from "../screens/Customer/CustomerDate";
import { ProfessionalsAvailable } from "../screens/Customer/ProfessionalsAvailable";
import { ProfessionalProfile } from "../screens/Customer/ProfessionalProfile";
import { Notification } from "../screens/Customer/Notification";
import { CustomerScheduling } from "../screens/Customer/Scheduling";
import { Favorites } from "../screens/Customer/Favorites";
import { CompanyRegistrationData } from "../screens/Company/DataRegistration";
import { CompanyRegistrationAddress } from "../screens/Company/AddressRegistration";
import { CompanyRegistrationProfession } from "../screens/Company/ProfessionRegistration";
import { CompanyRegistrationPassword } from "../screens/Company/PasswordRegistration";
import { CompanyScheduling } from "../screens/Company/CompanyScheduling";
import { EditEvent } from "../screens/Company/EditEvent";
import { EditSchedule } from "../screens/Company/EditSchedule";
import { CompanyNotification } from "../screens/Company/Notification";
import { Reports } from "../screens/Company/Reports";

const Stack = createNativeStackNavigator();

function PublicRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Customer Registration Data" component={CustomerRegistrationData} />
      <Stack.Screen name="Customer Registration Address" component={CustomerRegistrationAddress} />
      <Stack.Screen name="Customer Registration Password" component={CustomerRegistrationPassword} />
      <Stack.Screen name="Company Registration Data" component={CompanyRegistrationData} />
      <Stack.Screen name="Company Registration Address" component={CompanyRegistrationAddress} />
      <Stack.Screen name="Company Registration Profession" component={CompanyRegistrationProfession} />
      <Stack.Screen name="Company Registration Password" component={CompanyRegistrationPassword} />
    </Stack.Navigator>
  );
};

function CustomerRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Customer Home" component={CustomerHome} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Customer Date" component={CustomerDate} />
      <Stack.Screen name="Professionals Available" component={ProfessionalsAvailable} />
      <Stack.Screen name="Professional Profile" component={ProfessionalProfile} /> 
      <Stack.Screen name="Customer Notifications" component={Notification} />
      <Stack.Screen name="Customer Scheduling" component={CustomerScheduling} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};

function CompanyRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Company Scheduling" component={CompanyScheduling} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Edit Event" component={EditEvent} />
      <Stack.Screen name="Edit Schedule" component={EditSchedule} />
      <Stack.Screen name="Company Notifications" component={CompanyNotification} />
      <Stack.Screen name="Reports" component={Reports} />
    </Stack.Navigator>
  );
};

function Routes() {
  const { user } = useUser();

  if (!user) return <PublicRoutes />;

  if (user.userType === "CUSTOMER") return <CustomerRoutes />;
  if (user.userType === "COMPANY") return <CompanyRoutes />;

  return <PublicRoutes />;
};

export function AppNavigation() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};