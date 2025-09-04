import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { NotificationCustomer } from "@/src/components/display/NotificationCustomer";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { colors } from "@/src/styles/theme";

export const Notification: React.FC = () => {
  const handleProfile = () => {
    console.log("Perfil");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
          <UserIcon onPress={handleProfile}/>
        </View>

        <Text style={styles.title}>Notificações</Text>
        <View style={styles.separator} />

        <NotificationCustomer />
      </View>

      <CustomerNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "25%",
    paddingHorizontal: "5%",
  },
  title: {
    fontWeight: "700",
    fontSize: 22,
    marginBottom: "10%",
    marginTop: "20%",
    paddingHorizontal: "5%",
  },
  separator: {
    borderWidth: 1,
    borderColor: colors.light_gray,
  }
});