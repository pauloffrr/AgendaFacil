import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Logo } from "@/src/components/display/Logo";
import { Input } from "@/src/components/inputs/Input";
import { PasswordInput } from "@/src/components/inputs/PasswordInput";
import { Button } from "@/src/components/buttons/Button";
import { LoginProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";

export const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const handleLogin = () => {
    console.log("Login:", { email, senha });
    navigation.navigate("Customer Home");
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
          onPress={() => navigation.navigate("Customer Registration Data")}
        >
          <Text style={styles.link}>Criar Conta</Text>
        </TouchableOpacity>

        <Button buttonText="Entrar" onPress={handleLogin} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.blue,
    fontWeight: "bold",
  }
});