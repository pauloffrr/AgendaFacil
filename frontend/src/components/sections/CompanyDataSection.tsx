import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "@/src/components/inputs/Input";
import { MaskInput } from "@/src/components/inputs/MaskInput";
import { Button } from "@/src/components/buttons/Button";
import { SectionProps } from "@/src/types/ProfileSectionType";

export const CompanyDataSection: React.FC<SectionProps> = () => {
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [razaoSocial, setRazaoSocial] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [raioKm, setRaioKm] = useState("");
    
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={64}
        >
        
            <Input
                label="Nome"
                value={nomeFantasia}
                onChangeText={setNomeFantasia}
                placeholder="Insira o nome da sua empresa"
                keyboardType="default"
            />
    
            <Input
                label="Razão Social"
                value={razaoSocial}
                onChangeText={setRazaoSocial}
                placeholder="Insira a razão social da sua empresa"
                keyboardType="numeric"
            />
    
            <MaskInput
                label="CNPJ"
                mask="99.999.999/9999-99"
                value={cnpj}
                onChangeTextMask={(text) => setCnpj(text)}
                keyboardType="numeric"
                placeholder="00.000.000/0000-00"
            />
    
            <Input
                label="Raio de Atendimento"
                value={raioKm}
                onChangeText={setRaioKm}
                placeholder="Distância máxima de deslocamento (km)"
                keyboardType="numeric"
            />

            <Button buttonText="Salvar" onPress={() => console.log("salvo")} />

        </KeyboardAwareScrollView>
    );
};