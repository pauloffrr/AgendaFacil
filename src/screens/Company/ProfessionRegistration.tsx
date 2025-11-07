import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { Picker } from "@react-native-picker/picker";
import { Button } from "@/src/components/buttons/Button";
import * as Progress from "react-native-progress";
import { CategoryMock } from "@/src/data/CategoriesMock";
import { ProfessionMock } from "@/src/data/ProfessionMock";
import { CompanyRegistrationProfessionProps } from "@/src/types/CompanyStackType";
import { Category } from "@/src/types/CategoryType";
import { Profession } from "@/src/types/ProfessionType";
import { colors } from "@/src/styles/theme";

export const CompanyRegistrationProfession: React.FC<CompanyRegistrationProfessionProps> = ({ navigation, route }) => {
  const [category, setCategory] = useState<Category[]>([]);
  const [profession, setProfession] = useState<Profession[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | "">("");
  const [selectedProfession, setSelectedProfession] = useState<string | "">("");
  const [errorMessage, setErrorMessage] = useState("");
  const { 
    name, 
    corporateReason, 
    cnpjValue, 
    rayKm, 
    phone, 
    selectedState, 
    selectedCity, 
    street, 
    number, 
    complement 
  } = route.params;

  useEffect(() => {
    setCategory(CategoryMock as Category[]);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const categoryObj = (CategoryMock as Category[]).find(
        (cat) => cat.name === selectedCategory
      );

      if (categoryObj) {
        const filteredProfessions = (ProfessionMock as Profession[]).filter(
          (profession) => profession.categoryId === categoryObj.id
        );
        setProfession(filteredProfessions);
      }
    } else {
      setProfession([]);
    }
  }, [selectedCategory]);

  const next = () => {
    if (!selectedCategory || !selectedProfession) {
      setErrorMessage("Todos os campos são obrigatórios!");
      
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      
      return;
    }

    navigation.navigate("Company Registration Password", {  
      name, 
      corporateReason, 
      cnpjValue,
      rayKm,
      phone, 
      selectedState, 
      selectedCity, 
      street, 
      number, 
      complement,
      selectedCategory,
      selectedProfession
    });
  };

  return (
    <View style={styles.container}>
      <BackButton />
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
                value={category.name}
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
              <Picker.Item key={prof.id} label={prof.name} value={prof.name} />
            ))}
          </Picker>
        </View>
      </View>

      <Button buttonText="Enviar" onPress={next} />

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <Progress.Bar style={styles.progressBar} progress={0.75} width={355} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: "5%",
    gap: "3%",
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: "5%",
    marginTop: "10%",
  },
  inputs: {
    marginTop: "10%",
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
    borderColor: colors.light_gray,
    borderRadius: 8,
    backgroundColor: colors.background_input,
    marginBottom: "10%",
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  disabledPicker: {
    backgroundColor: colors.disable_input_background,
    borderColor: colors.disable_input_border,
    opacity: 0.6,
  },
  errorMessage: {
    fontSize: 18,
    marginTop: "5%",
    color: colors.red,
    fontWeight: "bold",
    textAlign: "center"
  },
  progressBar: {
    marginTop: "30%",
    width: "100%"
  }
});