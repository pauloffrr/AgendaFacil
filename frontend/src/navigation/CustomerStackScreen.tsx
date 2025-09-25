import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomerStackParamList } from "@/src/types/CustomerStackType";
import { CustomerHome } from "@/src/screens/Customer/Home";

const Stack = createNativeStackNavigator<CustomerStackParamList>();

export const CustomerStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Customer Home" component={CustomerHome} />
  </Stack.Navigator>
);
