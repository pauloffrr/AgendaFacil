import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BackButton } from "../../components/layout/BackButton";
import Logo from "../../components/Logo";
import { Picker } from "@react-native-picker/picker";
import { categoryMock } from "../../data/categoryMock";
import { professionMock } from "../../data/professionMock";
import { Button } from "../../components/layout/Button";
import * as Progress from "react-native-progress";

export default function ProfessionRegistration({ navigation }) {
  const [category, setCategory] = useState([]);
  const [profession, setProfession] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");

  useEffect(() => {
    setCategory(categoryMock);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredProfessions = professionMock.filter(
        (profession) => profession.categoryId === selectedCategory
      );
      setProfession(filteredProfessions);
    } else {
      setProfession([]);
    }
  }, [selectedCategory]);

  const next = () => {
    console.log(selectedCategory, selectedProfession);
    navigation.navigate("Company Registration Password");
  };

  return (
    <View style={styles.container}>
      <BackButton
        onPress={() => navigation.navigate("Company Registration Address")}
      />
      <Logo />
      <Text style={styles.title}>Informe a sua área de atuação</Text>

      <View style={styles.inputs}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              setSelectedProfession("");
            }}
          >
            <Picker.Item label="Selecione uma categoria" value="" />
            {category.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Profissão</Text>
        <View
          style={[
            styles.pickerContainer,
            !selectedCategory && styles.disabledPicker,
          ]}
        >
          <Picker
            style={styles.picker}
            selectedValue={selectedProfession}
            onValueChange={(value) => setSelectedProfession(value)}
            enabled={selectedCategory !== ""}
          >
            <Picker.Item label="Selecione uma profissão" value="" />
            {profession.map((prof) => (
              <Picker.Item key={prof.id} label={prof.name} value={prof.id} />
            ))}
          </Picker>
        </View>
      </View>

      <Button buttonText="Enviar" onPress={next} />
      <Progress.Bar style={styles.progressBar} progress={0.75} width={305} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    gap: 20,
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 20,
    marginTop: 50,
  },
  inputs: {
    marginTop: 30,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "bold",
  },
  pickerContainer: {
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom: 30,
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  disabledPicker: {
    backgroundColor: "#e6e6e6",
    borderColor: "#d0d0d0",
    opacity: 0.6,
  },
  progressBar: {
    marginTop: 50,
  },
});
