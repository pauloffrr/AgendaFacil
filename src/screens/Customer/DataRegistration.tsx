import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { cpf } from 'cpf-cnpj-validator';
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { SelectAccount } from "@/src/components/buttons/SelectAccount";
import { Input } from "@/src/components/inputs/Input";
import { MaskInput } from "@/src/components/inputs/MaskInput";
import { Button } from "@/src/components/buttons/Button";
import * as Progress from "react-native-progress";
import { CustomerRegistrationDataProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";

export const CustomerRegistrationData: React.FC<CustomerRegistrationDataProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpfValue, setCpfValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const next = async () => {
    setErrorMessage("");

    if (!name || !phone || !cpf) {
      setErrorMessage("Todos os campos são obrigatórios!");
      
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      
      return;
    }

    const cleanCpf = cpfValue.replace(/\D/g, '');
    
    if (!cpf.isValid(cleanCpf)) {
      setErrorMessage("CPF inválido ou inexistente!");
      
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      
      return;
    }

    navigation.navigate("Customer Registration Address", { name, phone, cpfValue });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid
      extraScrollHeight={64}
    >
      <BackButton />

      <Logo />
      <Text style={styles.title}>Informações pessoais</Text>
      <SelectAccount />

      <Input
        label="Nome"
        value={name}
        onChangeText={setName}
        placeholder="Insira seu nome"
        keyboardType="default"
      />

      <MaskInput
        label="Telefone"
        mask="(99) 99999-9999"
        value={phone}
        onChangeTextMask={(text) => setPhone(text)}
        keyboardType="phone-pad"
        placeholder="(00) 00000-0000"
      />

      <MaskInput
        label="CPF"
        mask="999.999.999-99"
        value={cpfValue}
        onChangeTextMask={(text) => setCpfValue(text)}
        keyboardType="numeric"
        placeholder="000.000.000-00"
      />

      <Button buttonText="Enviar" onPress={next} />

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <Progress.Bar style={styles.progressBar} progress={0.33} width={355} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: "5%",
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: "10%",
    marginTop: "10%",
  },
  errorMessage: {
    fontSize: 18,
    marginTop: "5%",
    color: colors.red,
    fontWeight: "bold",
    textAlign: "center"
  },
  progressBar: {
    marginTop: "20%",
    width: "100%"
  }
});