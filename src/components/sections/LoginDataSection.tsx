import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "@/src/components/inputs/Input";
import { PasswordInput } from "@/src/components/inputs/PasswordInput";
import { Button } from "@/src/components/buttons/Button";
import { SectionProps } from "@/src/types/ProfileSectionType";

export const LoginDataSection: React.FC<SectionProps> = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraScrollHeight={64}
        >
        
            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Insira o seu email"
                keyboardType="email-address"
            />

            <PasswordInput
                label="Senha"
                placeholder={"Insira a sua senha"}
                value={senha}
                onChangeText={setSenha}
            />

            <Button buttonText="Salvar" onPress={() => console.log("salvo")} />
        </KeyboardAwareScrollView>
    );
};