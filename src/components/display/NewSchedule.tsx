import React from "react";
import { View } from "react-native";
import { RadioButton } from "@/src/components/buttons/RadioButton";
import { ValueProps } from "@/src/types/RadioButtonType";

export const NewSchedule: React.FC<ValueProps> = ({ value, onChangeValue }) => {

    return (
        <View>
            <RadioButton
                label="Bloquear Horário"
                value="BLOCKED"
                selectedValue={value}
                onSelect={onChangeValue}
            />

            <RadioButton
                label="Adicionar novo horário"
                value="CONFIRMED"
                selectedValue={value}
                onSelect={onChangeValue}
            />
        </View>
    );
};