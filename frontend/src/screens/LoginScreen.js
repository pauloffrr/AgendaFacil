import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/Input";
import Logo from "../components/Logo";
import Button from "../components/Button";
import PasswordInput from "../components/PasswordInput";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    console.log("Login:", { email, senha });
    // API ou navegação
    navigation.navigate("Customer Home")
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      contentContainerStyle={styles.container}
    >
      <Logo />
      <Text style={styles.welcome}>Boas Vindas!</Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Insira o seu email"
        keyboardType="email-address"
      />

      <PasswordInput 
        label="Senha"
        placeholder={"Insira a sua senha"}
        value={senha}
        onChangeText={setSenha}
      />

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Customer Registration Data")
          }
        >
          <Text style={styles.link}>Criar Conta</Text>
        </TouchableOpacity>

        <Button buttonText="Entrar" onPress={handleLogin} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcome: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  }
});
