import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Logo } from "@/src/components/display/Logo";
import { Input } from "@/src/components/inputs/Input";
import { PasswordInput } from "@/src/components/inputs/PasswordInput";
import { Button } from "@/src/components/buttons/Button";
import { LoginProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import api from "@/src/services/Api";
import { ApiError } from "../types/ApiErrorType";

export const LoginScreen: React.FC<LoginProps> = ({ navigation, setUserType }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");

  const getErrorMessage = (error: ApiError): string => {
    if (error.response?.data) {
      const backendError = error.response.data;
      
      if (typeof backendError === 'object' && backendError.message) {
        return backendError.message;
      }
      
      if (typeof backendError === 'string') {
        return backendError;
      }
    }

    if (error.message?.includes('Network Error')) {
      return "Erro de conexão. Verifique sua internet.";
    }
    
    return "Email ou senha inválidos. Tente novamente!";
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user, message } = response.data;

      await login(token);
      setUser(user);

      setSucessMessage(message || "Login realizado com sucesso!");
      setTimeout(() => {
        setSucessMessage("")
      }, 1500);

    } catch (error: unknown) {
      let errorMsg = "Email ou senha inválidos. Tente novamente!";
      
      if (typeof error === 'object' && error !== null) {
        errorMsg = getErrorMessage(error as ApiError);
      } else if (typeof error === 'string') {
        errorMsg = error;
      }

      setErrorMessage(errorMsg);

      setTimeout(() => {
        setErrorMessage("")
      }, 1500);
    }
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
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Customer Registration Data")}
        >
          <Text style={styles.link}>Criar Conta</Text>
        </TouchableOpacity>

        <Button buttonText="Entrar" onPress={handleLogin} />
      </View>

      {
        errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : 
        sucessMessage ? <Text style={styles.sucessMessage}>{sucessMessage}</Text> : 
        null
      }
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
  },
  welcome: {
    fontSize: 20,
    marginBottom: "10%",
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
    fontSize: 16
  },
  sucessMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.green,
    fontWeight: "bold"
  },
  errorMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.red,
    fontWeight: "bold"
  }
});