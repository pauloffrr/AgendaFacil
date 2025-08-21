import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // precisa do pacote expo/vector-icons
import CustomerRegistrationData from "./Customer/DataRegistration";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../components/Input";
import Logo from "../components/Logo";
import Button from "../components/Button";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login:", { email, senha });
    // API ou navegação
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
        placeholder="Insira seu email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Insira sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Customer Registration Data", {
              CustomerRegistrationData,
            })
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
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "bold",
  },
  passwordContainer: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
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
  },
});
