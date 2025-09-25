import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CompanyStackParamList } from "@/src/types/CompanyStackType";
import { CompanyScheduling } from "@/src/screens/Company/CompanyScheduling";

const Stack = createNativeStackNavigator<CompanyStackParamList>();

export const CompanyStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Company Scheduling" component={CompanyScheduling} />
  </Stack.Navigator>
);
