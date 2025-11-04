import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "@/src/components/inputs/Input";
import { MaskInput } from "@/src/components/inputs/MaskInput";
import { Button } from "@/src/components/buttons/Button";
import { SectionProps } from "@/src/types/ProfileSectionType";

export const PersonalDataSection: React.FC<SectionProps> = () => {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={64}
        >
        
            <Input
                label="Nome"
                value={nome}
                onChangeText={setNome}
                placeholder="Insira seu nome"
                keyboardType="default"
            />
    
            <Input
                label="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                placeholder="Insira seu telefone"
                keyboardType="phone-pad"
            />
    
            <MaskInput
                label="CPF"
                mask="999.999.999-99"
                value={cpf}
                onChangeTextMask={(text) => setCpf(text)}
                keyboardType="numeric"
                placeholder="000.000.000-00"
            />

            <Button buttonText="Salvar" onPress={() => console.log("salvo")} />
        </KeyboardAwareScrollView>
    );
};