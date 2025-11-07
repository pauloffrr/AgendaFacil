import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { Input } from "@/src/components/inputs/Input";
import { PasswordInput } from "@/src/components/inputs/PasswordInput";
import { Button } from "@/src/components/buttons/Button";
import * as Progress from "react-native-progress";
import { CustomerRegistrationPasswordProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";
import api from "@/src/services/Api";
import { ApiError } from "@/src/types/ApiErrorType";

export const CustomerRegistrationPassword: React.FC<CustomerRegistrationPasswordProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { name, phone, cpfValue, selectedState, selectedCity, street, number, complement } = route.params;

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
    
    return "Erro ao realizar cadastro. Tente novamente!";
  };

  const next = async () => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      if (!email || !password) {
      setErrorMessage("Email e Senha são obrigatórios!");
      
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      
      return;
    }

      const payload = {
        name,
        cpf: cpfValue,
        phone,
        state: selectedState,
        city: selectedCity,
        street,
        number: Number(number),
        complement,
        email,
        password
      }

      const response = await api.post("/customer", payload);
      setSuccessMessage(response.data.message || "Cadastro realizado com sucesso!");

      setTimeout(() => {
        navigation.navigate("Login");
      }, 1500);

    } catch (error: unknown) {
      let errorMsg = "Erro ao realizar cadastro. Tente novamente!";
      
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
      style={styles.container}
      extraScrollHeight={84}>
      <View style={styles.space}>
        <BackButton />

        <Logo />
        <Text style={styles.title}>Cadastro de Email e Senha</Text>

        <View style={styles.inputs}>
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

          <Button buttonText="Enviar" onPress={next} />

          {
            errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : 
            successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : 
            null
          }

          <Progress.Bar style={styles.progressBar} progress={1} width={355} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: "5%",
  },
  space: {
    gap: "5%",
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: "5%",
    marginTop: "5%",
  },
  inputs: {
    gap: "5%",
  },
  errorMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.red,
    fontWeight: "bold",
    textAlign: "center"
  },
  successMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.green,
    fontWeight: "bold",
    textAlign: "center"
  },
  progressBar: {
    marginTop: "30%",
    width: "100%"
  }
});