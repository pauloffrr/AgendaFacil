import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AddressInput } from "@/src/components/inputs/AddressInput";
import { Input } from "@/src/components/inputs/Input";
import { Button } from "@/src/components/buttons/Button";
import { SectionProps } from "@/src/types/ProfileSectionType";

export const AddressSection: React.FC<SectionProps> = () => {
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={84}
        >
            <AddressInput
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
            />
    
            <Input
                label="Rua"
                value={rua}
                onChangeText={setRua}
                placeholder="Insira o nome da sua rua"
                keyboardType="default"
            />
    
            <Input
                label="Número"
                value={numero}
                onChangeText={setNumero}
                placeholder="Insira o número da sua casa"
                keyboardType="numeric"
            />
    
            <Input
                label="Complemento (opcional)"
                value={complemento}
                onChangeText={setComplemento}
                placeholder="Insira seu complemento"
                keyboardType="default"
            />

            <Button buttonText="Salvar" onPress={() => console.log("salvo")} />
    
        </KeyboardAwareScrollView>
    );
};