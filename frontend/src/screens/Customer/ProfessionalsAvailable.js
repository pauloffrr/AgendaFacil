import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../../components/BackButton";
import Logo from "../../components/Logo";
import UserIcon from "../../components/UserIcon";
import CustomerNavigationBar from "../../components/CustomerNavigationBar";
import CardProfessional from "../../components/CardProfessional";

export default function ProfessionalsAvailable({ navigation, route }) {
  const { name } = route.params;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <BackButton
          onPress={() => navigation.navigate("Customer Date", { name: name })}
        />

        <View style={styles.header}>
          <Logo />
          <UserIcon />
        </View>

        <Text style={styles.title}>{name}(s) disponíveis na data desejada</Text>
        
        <CardProfessional />
      </View>

      <CustomerNavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  space: {
    gap: 20,
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
    fontSize: 18,
    marginBottom: 30,
    marginTop: 50,
  },
  card: {
    borderColor: "#dfdedeff",
    borderStyle: "solid",
    borderWidth: 2,
    height: 130,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row"
  },
  img: {
    width: 120,
    height: 126,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  },
});
