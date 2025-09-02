import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton } from "../../components/buttons/BackButton";
import { Logo } from "../../components/display/Logo";
import { SelectAccount } from "../../components/display/SelectAccount";
import { Input } from "../../components/inputs/Input";
import { MaskInput } from "../../components/inputs/MaskInput";
import { Button } from "../../components/buttons/Button";
import * as Progress from "react-native-progress";

export default function CompanyRegistrationData({ navigation }) {
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [raioKm, setRaioKm] = useState("");

  const next = () => {
    console.log("Criar Conta:", { nomeFantasia, razaoSocial, cnpj });
    // API ou navegação
    navigation.navigate("Company Registration Address");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid
      extraScrollHeight={144}
    >
      <BackButton onPress={() => navigation.navigate("Login")} />

      <Logo />
      <Text style={styles.title}>Informações da empresa</Text>
      <SelectAccount />

      <Input
        label="Nome"
        value={nomeFantasia}
        onChangeText={setNomeFantasia}
        placeholder="Insira o nome da sua empresa"
        keyboardType="default"
      />

      <Input
        label="Razão Social"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
        placeholder="Insira a razão social da sua empresa"
        keyboardType="numeric"
      />

      <MaskInput
        label="CNPJ"
        mask="99.999.999/9999-99"
        value={cnpj}
        onChangeText={(text, rawText) => setCnpj(rawText)}
        keyboardType="numeric"
        placeholder="00.000.000/0000-00"
      />

      <Input
        label="Raio de Atendimento"
        value={raioKm}
        onChangeText={setRaioKm}
        placeholder="Distância máxima de deslocamento (km)"
        keyboardType="numeric"
      />

      <Button buttonText="Enviar" onPress={next} />

      <Progress.Bar style={styles.progressBar} progress={0.25} width={305} />

      <Text />
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
    marginBottom: 20,
    marginTop: 15,
  },
  progressBar: {
    marginTop: 15,
    marginBottom: 60,
  },
});
