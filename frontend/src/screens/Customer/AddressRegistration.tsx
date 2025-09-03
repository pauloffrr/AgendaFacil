import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Logo } from "../../components/display/Logo";
import { Input } from "../../components/inputs/Input";
import { Button } from "../../components/buttons/Button";
import * as Progress from "react-native-progress";
import { BackButton } from "../../components/buttons/BackButton";
import { AddressInput } from "../../components/inputs/AddressInput";
import { CustomerRegistrationAddressProps } from "@/src/types/CustomerStackType";

export const CustomerRegistrationAddress: React.FC<
  CustomerRegistrationAddressProps
> = ({ navigation }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const next = () => {
    console.log("Criar Conta:", { rua });
    navigation.navigate("Customer Registration Password");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid
      extraScrollHeight={84}
    >
      <View style={styles.space}>
        <BackButton
          onPress={() => navigation.navigate("Customer Registration Data")}
        />

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

        <Progress.Bar style={styles.progressBar} progress={0.66} width={305} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  space: {
    gap: 10,
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20,
  },
  progressBar: {
    marginTop: 15,
  },
});
