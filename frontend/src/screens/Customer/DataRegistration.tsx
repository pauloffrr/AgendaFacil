import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
        onChangeTextMask={(text) => setCpf(text)}
        keyboardType="numeric"
        placeholder="000.000.000-00"
      />

      <Button buttonText="Enviar" onPress={next} />

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
  progressBar: {
    marginTop: "20%",
    width: "100%"
  }
});