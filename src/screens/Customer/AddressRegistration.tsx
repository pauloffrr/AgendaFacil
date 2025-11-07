import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { AddressInput } from "@/src/components/inputs/AddressInput";
import { Input } from "@/src/components/inputs/Input";
import { Button } from "@/src/components/buttons/Button";
import * as Progress from "react-native-progress";
import { CustomerRegistrationAddressProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";

export const CustomerRegistrationAddress: React.FC<CustomerRegistrationAddressProps> = ({ navigation, route }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { name, phone, cpfValue } = route.params;

  const next = () => {
    if (!selectedState || !selectedCity || !street || !number) {
      setErrorMessage("Todos os campos são obrigatórios!");
      
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      
      return;
    }

    navigation.navigate("Customer Registration Password", {  
      name, 
      phone, 
      cpfValue, 
      selectedState, 
      selectedCity, 
      street, 
      number, 
      complement
    });
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
          value={street}
          onChangeText={setStreet}
          placeholder="Insira o nome da sua rua"
          keyboardType="default"
        />

        <Input
          label="Número"
          value={number}
          onChangeText={setNumber}
          placeholder="Insira o número da sua casa"
          keyboardType="numeric"
        />

        <Input
          label="Complemento (opcional)"
          value={complement}
          onChangeText={setComplement}
          placeholder="Insira seu complemento"
          keyboardType="default"
        />

        <Button buttonText="Enviar" onPress={next} />

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <Progress.Bar style={styles.progressBar} progress={0.66} width={355} />
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
    gap: "1.3%",
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: "5%",
    marginTop: "5%",
  },
  errorMessage: {
    fontSize: 18,
    marginTop: "1%",
    color: colors.red,
    fontWeight: "bold",
    textAlign: "center"
  },
  progressBar: {
    marginTop: "5%",
    width: "100%"
  }
});