import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SelectAccount } from "../../components/buttons/SelectAccount";
import { Logo } from "../../components/display/Logo";
import { Input } from "../../components/inputs/Input";
import { Button } from "../../components/buttons/Button";
import * as Progress from "react-native-progress";
import { MaskInput } from "../../components/inputs/MaskInput";
import { BackButton } from "../../components/buttons/BackButton";
import { CustomerRegistrationDataProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";

export const CustomerRegistrationData: React.FC<CustomerRegistrationDataProps> = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const next = () => {
    console.log("Criar Conta:", { nome, telefone, cpf });
    navigation.navigate("Customer Registration Address");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid
      extraScrollHeight={64}
    >
      <BackButton onPress={() => navigation.navigate("Login")} />

      <Logo />
      <Text style={styles.title}>Informações pessoais</Text>
      <SelectAccount />

      <Input
        label="Nome"
        value={nome}
        onChangeText={setNome}
        placeholder="Insira seu nome"
        keyboardType="default"
      />

      <Input
        label="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Insira seu telefone"
        keyboardType="phone-pad"
      />

      <MaskInput
        label="CPF"
        mask="999.999.999-99"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
        keyboardType="numeric"
        placeholder="000.000.000-00"
      />

      <Button buttonText="Enviar" onPress={next} />

      <Progress.Bar style={styles.progressBar} progress={0.33} width={305} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 30,
    marginTop: 30,
  },
  progressBar: {
    marginTop: 30,
  },
});