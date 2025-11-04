import React, { useState } from "react";
import { View } from "react-native";
import { RadioButton } from "@/src/components/buttons/RadioButton";

export const NewSchedule: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState("");

    return (
        <View>
            <RadioButton
                label="Bloquear Horário"
                value="BLOCK"
                selectedValue={selectedOption} 
                onSelect={setSelectedOption}
            />

            <RadioButton
                label="Adicionar novo horário"
                value="NEW"
                selectedValue={selectedOption}
                onSelect={setSelectedOption}
            />
        </View>
    );
};