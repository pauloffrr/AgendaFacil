import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SectionProps } from "@/src/types/ProfileSectionType";
import { CategoryMock } from "@/src/data/CategoriesMock";
import { ProfessionMock } from "@/src/data/ProfessionMock";
import { Category } from "@/src/types/CategoryType";
import { Profession } from "@/src/types/ProfessionType";
import { Button } from "@/src/components/buttons/Button";
import { colors } from "@/src/styles/theme";

export const ProfessionDataSection: React.FC<SectionProps> = () => {
    const [category, setCategory] = useState<Category[]>([]);
    const [profession, setProfession] = useState<Profession[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | "">("");
    const [selectedProfession, setSelectedProfession] = useState<number | "">("");

    useEffect(() => {
    setCategory(CategoryMock as Category[]);
    }, []);

    useEffect(() => {
    if (selectedCategory) {
        const filteredProfessions = (ProfessionMock as Profession[]).filter(
        (profession) => profession.categoryId === selectedCategory
        );
        setProfession(filteredProfessions);
    } else {
        setProfession([]);
    }
    }, [selectedCategory]);
    
    return (
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

            <Button buttonText="Salvar" onPress={() => console.log("salvo")} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputs: {
        marginTop: "10%"
    },
    label: {
        alignSelf: "flex-start",
        marginBottom: 5,
        fontWeight: "bold"
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
        justifyContent: "center"
    },
    picker: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
    disabledPicker: {
        backgroundColor: colors.disable_input_background,
        borderColor: colors.disable_input_border,
        opacity: 0.6
    }
});