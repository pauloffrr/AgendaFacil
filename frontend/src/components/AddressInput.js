import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function AddressInput({
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity
}) {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(res => res.json())
            .then(data => {
                const sorted = data.sort((a, b) => a.nome.localeCompare(b.nome));
                setStates(sorted);
            })
            .catch(error => {
                console.error("Erro ao buscar estados:", error);
            });
    }, []);

    useEffect(() => {
        if (selectedState) {
            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const sorted = data.sort((a, b) => a.nome.localeCompare(b.nome));
                    setCities(sorted);
                })
                .catch(error => {
                    console.error("Erro ao buscar cidades:", error);
                });
        } else {
            setCities([]);
        }
    }, [selectedState]);

    const handleStateChange = (value) => {
        if (setSelectedState && typeof setSelectedState === 'function') {
            setSelectedState(value);
        
            if (setSelectedCity && typeof setSelectedCity === 'function') {
                setSelectedCity("");
            }
        } else {
            console.log("setSelectedState não é uma função válida!");
        }
    };

    const handleCityChange = (value) => {
        if (setSelectedCity && typeof setSelectedCity === 'function') {
            setSelectedCity(value);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.state}>
                <Text style={styles.label}>Estado</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedState}
                        onValueChange={handleStateChange}
                    >
                        <Picker.Item label="Selecione um estado" value="" />
                        {states.map(state => (
                            <Picker.Item key={state.id} label={state.sigla} value={state.id} />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={styles.city}>
                <Text style={styles.label}>Cidade</Text>
                <View style={[styles.pickerContainer, !selectedState && styles.disabledPicker]}>
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedCity}
                        onValueChange={handleCityChange}
                        enabled={selectedState !== ""}
                    >
                        <Picker.Item label="Selecione uma cidade" value="" />
                        {cities.map(city => (
                            <Picker.Item key={city.id} label={city.nome} value={city.nome} />
                        ))}
                    </Picker>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
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
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#f5f5f5",
        marginBottom: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    picker: {
        width: "100%",
        height: "100%",
        backgroundColor: 'transparent',
    },
    disabledPicker: {
        backgroundColor: "#e6e6e6",
        borderColor: "#d0d0d0",
        opacity: 0.6,
    },
});