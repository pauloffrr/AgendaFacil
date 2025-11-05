import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { Input } from "@/src/components/inputs/Input";
import { PasswordInput } from "@/src/components/inputs/PasswordInput";
import { Button } from "@/src/components/buttons/Button";
import * as Progress from "react-native-progress";
import { CompanyRegistrationPasswordProps } from "@/src/types/CompanyStackType";
import { colors } from "@/src/styles/theme";
import api from "@/src/services/Api";

export const CompanyRegistrationPassword: React.FC<CompanyRegistrationPasswordProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { 
    name, 
    corporateReason, 
    cnpj, 
    rayKm, 
    phone, 
    selectedState, 
    selectedCity,
    street, 
    number, 
    complement, 
    selectedCategory, 
    selectedProfession 
  } = route.params;

  const next = async () => {
    try {
      const payload = {
        name, 
        corporateReason, 
        cnpj, 
        rayKm: Number(rayKm), 
        phone, 
        state: selectedState, 
        city: selectedCity,
        street, 
        number: Number(number), 
        complement, 
        category: selectedCategory, 
        profession: selectedProfession,
        email,
        password
      }

      await api.post("/company", payload);

      navigation.navigate("Login");

    } catch(error) {
      console.error("Error registering", error)
    }
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid style={styles.container}>
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
    marginTop: "10%",
  },
  inputs: {
    gap: "5%",
  },
  progressBar: {
    marginTop: "30%",
    width: "100%"
  }
});