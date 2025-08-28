import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomerNavigationBar from "../../components/CustomerNavigationBar";
import Logo from "../../components/Logo";
import UserIcon from "../../components/UserIcon";

export default function Notification({ navigation }) {
  return (
    <View style={styles.screen}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Logo />
                <UserIcon />
            </View>

            <Text style={styles.title}>Notificações</Text>
            <View style={styles.separator} />
        </View>

      <CustomerNavigationBar navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontWeight: "700",
    fontSize: 22,
    marginBottom: 30,
    marginTop: 50,
  },
  separator: {
    borderWidth: 1,
    borderColor: "#D9D9D9"
  }
});