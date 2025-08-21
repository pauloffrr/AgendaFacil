import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Progress from "react-native-progress";
import CustomerRegistrationData from "./DataRegistration";
import BackButton from "../../components/BackButton";
import AddressInput from "../../components/AddressInput";

export default function CustomerRegistrationAddress({ navigation }) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [endereco, setEndereco] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const next = () => {
    console.log("Criar Conta:", { endereco, rua });
    // API ou navegação
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid
      extraScrollHeight={124}
    >
      <BackButton
        onPress={() => navigation.navigate("Customer Registration Data", { CustomerRegistrationData })}
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
        label="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Insira o seu endereço"
        keyboardType="default"
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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20
  },
  progressBar: {
    marginTop: 20,
    marginBottom: 60
  },
});
