import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton } from "@/src/components/buttons/RadioButton";

export const RepeatScheduling: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState("");

    return (
        <View style={styles.container}>
            <RadioButton
                label="Não se repete"
                value="NO"
                selectedValue={selectedOption} 
                onSelect={setSelectedOption}
            />

            <RadioButton
                label="Todos os dias"
                value="DAYS"
                selectedValue={selectedOption}
                onSelect={setSelectedOption}
            />

            <RadioButton
                label="Todas as semanas"
                value="WEEKS"
                selectedValue={selectedOption}
                onSelect={setSelectedOption}
            />

            <RadioButton
                label="Todos os meses"
                value="MONTHS"
                selectedValue={selectedOption}
                onSelect={setSelectedOption}
            />

            <RadioButton
                label="Todos os anos"
                value="YEARS"
                selectedValue={selectedOption}
                onSelect={setSelectedOption}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: "5%"
    }
})