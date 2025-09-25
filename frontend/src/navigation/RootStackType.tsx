import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "@/src/screens/LoginScreen";
import { CustomerStackScreen } from "@/src/navigation/CustomerStackScreen";
import { CompanyStackScreen } from "@/src/navigation/CompanyStackScreen";
import { RootStackParamList } from "@/src/types/RootStackType";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [userType, setUserType] = useState<"CUSTOMER" | "COMPANY" | null>(null);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!userType ? (
          <RootStack.Screen name="Login">
            {props => <LoginScreen {...props} setUserType={setUserType} />}
          </RootStack.Screen>
        ) : userType === "CUSTOMER" ? (
          <RootStack.Screen name="CustomerStack" component={CustomerStackScreen} />
        ) : (
          <RootStack.Screen name="CompanyStack" component={CompanyStackScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
