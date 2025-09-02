import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectAccount from "../../components/SelectAccount";
import Logo from "../../components/Logo";
import { Input } from "../../components/inputs/Input";
import { Button } from "../../components/buttons/Button";
import * as Progress from "react-native-progress";
import MaskInput from "../../components/MaskInput";
import { BackButton } from "../../components/buttons/BackButton";

export default function CustomerRegistrationData({ navigation }) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const next = () => {
    console.log("Criar Conta:", { nome, telefone, cpf });
    // API ou navegação
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
        onChangeText={(text, rawText) => setCpf(rawText)}
        keyboardType="numeric"
        placeholder="000.000.000-00"
      />

      <Button buttonText="Enviar" onPress={next} />

      <Progress.Bar style={styles.progressBar} progress={0.33} width={305} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
