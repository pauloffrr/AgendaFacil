import React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton } from "@/src/components/buttons/RadioButton";
import { ValueProps } from "@/src/types/RadioButtonType";

export const RepeatScheduling: React.FC<ValueProps> = ({ value, onChangeValue }) => {

    return (
        <View style={styles.container}>
            <RadioButton
                label="Não se repete"
                value="NO"
                selectedValue={value}
                onSelect={onChangeValue}
            />

            <RadioButton
                label="Todos os dias"
                value="DAYS"
                selectedValue={value}
                onSelect={onChangeValue}
            />

            <RadioButton
                label="Todas as semanas"
                value="WEEKS"
                selectedValue={value}
                onSelect={onChangeValue}
            />

            <RadioButton
                label="Todos os meses"
                value="MONTHS"
                selectedValue={value}
                onSelect={onChangeValue}
            />

            <RadioButton
                label="Todos os anos"
                value="YEARS"
                selectedValue={value}
                onSelect={onChangeValue}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: "5%"
    }
})