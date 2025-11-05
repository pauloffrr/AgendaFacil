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
  const [name, setName] = useState("");
  const [corporateReason, setCorporateReason] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [rayKm, setRayKm] = useState("");
  const [phone, setPhone] = useState("");

  const next = () => {
    navigation.navigate("Company Registration Address", { name, corporateReason, cnpj, rayKm, phone });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid
      extraScrollHeight={144}
    >
      <BackButton />

      <Logo />
      <Text style={styles.title}>Informações da empresa</Text>
      <SelectAccount />

      <Input
        label="Nome"
        value={name}
        onChangeText={setName}
        placeholder="Insira o nome da sua empresa"
        keyboardType="default"
      />

      <Input
        label="Razão Social"
        value={corporateReason}
        onChangeText={setCorporateReason}
        placeholder="Insira a razão social da sua empresa"
        keyboardType="default"
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
        value={rayKm}
        onChangeText={setRayKm}
        placeholder="Distância máxima de deslocamento (km)"
        keyboardType="numeric"
      />

      <MaskInput
        label="Telefone"
        mask="(99) 99999-9999"
        value={phone}
        onChangeTextMask={(text) => setPhone(text)}
        keyboardType="phone-pad"
        placeholder="(00) 00000-0000"
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
    marginBottom: "15%",
    width: "100%"
  }
});