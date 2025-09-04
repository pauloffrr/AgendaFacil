import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { CustomerRegistrationData } from "../screens/Customer/DataRegistration";
import { CustomerRegistrationAddress } from "../screens/Customer/AddressRegistration";
import { CustomerRegistrationPassword } from "../screens/Customer/PasswordRegistration";
import { CustomerHome } from "../screens/Customer/Home";
import { CustomerDate } from "../screens/Customer/CustomerDate";
import { ProfessionalsAvailable } from "../screens/Customer/ProfessionalsAvailable";
import { ProfessionalProfile } from "../screens/Customer/ProfessionalProfile";
import { Notification } from "../screens/Customer/Notification";
import { CompanyRegistrationData } from "../screens/Company/DataRegistration";
import { CompanyRegistrationAddress } from "../screens/Company/AddressRegistration";
import { CompanyRegistrationProfession } from "../screens/Company/ProfessionRegistration";
import { CompanyRegistrationPassword } from "../screens/Company/PasswordRegistration";

const Stack = createNativeStackNavigator();
export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Customer Registration Data"
          component={CustomerRegistrationData}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Customer Registration Address"
          component={CustomerRegistrationAddress}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Customer Registration Password"
          component={CustomerRegistrationPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Customer Home"
          component={CustomerHome}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Customer Date"
          component={CustomerDate}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Professionals Available"
          component={ProfessionalsAvailable}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Professional Profile"
          component={ProfessionalProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Customer Notifications"
          component={Notification}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Company Registration Data"
          component={CompanyRegistrationData}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Company Registration Address"
          component={CompanyRegistrationAddress}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Company Registration Profession"
          component={CompanyRegistrationProfession}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Company Registration Password"
          component={CompanyRegistrationPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};