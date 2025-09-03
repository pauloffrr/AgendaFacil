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
import { CompanyRegistrationDataProps } from "@/src/types/CompanyStackType";
import { colors } from "@/src/styles/theme";

export const CompanyRegistrationData: React.FC<CompanyRegistrationDataProps> = ({ navigation }) => {
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [raioKm, setRaioKm] = useState("");

  const next = () => {
    console.log("Criar Conta:", { nomeFantasia, razaoSocial, cnpj });
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
        onChangeTextMask={(text) => setCnpj(text)}
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

      <Progress.Bar style={styles.progressBar} progress={0.25} width={355} />

      <Text />
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
    marginBottom: "5%",
    marginTop: "5%",
  },
  progressBar: {
    marginTop: "5%",
    width: "100%"
  }
});