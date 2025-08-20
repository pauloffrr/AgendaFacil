import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import CustomerRegistrationData from "../screens/CustomerRegistrationData";
import CompanyRegistrationData from "../screens/CompanyRegistrationData";

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
          name="Company Registration Data"
          component={CompanyRegistrationData}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}