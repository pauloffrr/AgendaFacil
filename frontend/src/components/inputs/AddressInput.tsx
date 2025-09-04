import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getStates, getCitiesByState } from "@/src/services/IbgeServices";
import { State, City } from "@/src/types/AddressType";
import { AddressInputProps } from "@/src/types/AddressInputType";
import { colors } from "@/src/styles/theme";

export const AddressInput: React.FC<AddressInputProps> = ({
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
}) => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getStates();
        setStates(data);
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selectedState) {
        setCities([]);
        return;
      }
      try {
        const data = await getCitiesByState(selectedState);
        setCities(data);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
      }
    })();
  }, [selectedState]);

  return (
    <View style={styles.container}>
      <View style={styles.state}>
        <Text style={styles.label}>Estado</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={selectedState}
            onValueChange={(value) => {
              setSelectedState(value);
              setSelectedCity("");
            }}
          >
            <Picker.Item label="Selecione um estado" value="" />
            {states.map((state) => (
              <Picker.Item
                key={state.id}
                label={state.sigla}
                value={state.id.toString()}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.city}>
        <Text style={styles.label}>Cidade</Text>
        <View
          style={[
            styles.pickerContainer,
            !selectedState && styles.disabledPicker,
          ]}
        >
          <Picker
            style={styles.picker}
            selectedValue={selectedCity}
            onValueChange={(value) => setSelectedCity(value)}
            enabled={!!selectedState}
          >
            <Picker.Item label="Selecione uma cidade" value="" />
            {cities.map((city) => (
              <Picker.Item key={city.id} label={city.nome} value={city.nome} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  state: {
    width: "30%",
  },
  city: {
    width: "68%",
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
    marginBottom: "5%",
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
  }
});