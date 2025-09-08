import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { AddressInput } from "@/src/components/inputs/AddressInput";
import { Input } from "@/src/components/inputs/Input";
import { Button } from "@/src/components/buttons/Button";
import * as Progress from "react-native-progress";
import { CompanyRegistrationAddressProps } from "@/src/types/CompanyStackType";
import { colors } from "@/src/styles/theme";

export const CompanyRegistrationAddress: React.FC<CompanyRegistrationAddressProps> = ({ navigation }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const next = () => {
    console.log("Criar Conta:", { rua });
    navigation.navigate("Company Registration Profession");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid
      extraScrollHeight={84}
    >
      <View style={styles.space}>
        <BackButton />

        <Logo />
        <Text style={styles.title}>Informe o seu endereço!</Text>

        <AddressInput
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />

        <Input
          label="Rua"
          value={rua}
          onChangeText={setRua}
          placeholder="Insira o nome da sua rua"
          keyboardType="default"
        />

        <Input
          label="Número"
          value={numero}
          onChangeText={setNumero}
          placeholder="Insira o número da sua casa"
          keyboardType="numeric"
        />

        <Input
          label="Complemento (opcional)"
          value={complemento}
          onChangeText={setComplemento}
          placeholder="Insira seu complemento"
          keyboardType="default"
        />

        <Button buttonText="Enviar" onPress={next} />

        <Progress.Bar style={styles.progressBar} progress={0.5} width={355} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  space: {
    gap: 10,
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: "5%",
    marginTop: "5%",
  },
  progressBar: {
    marginTop: 15,
    width: "100%"
  }
});