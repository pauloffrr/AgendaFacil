import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton } from "../../components/layout/BackButton";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";
import * as Progress from "react-native-progress";

export default function PasswordRegistration({navigation}) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const next = () => {
        console.log("Criar Conta:", { email, senha })
        navigation.navigate("Login")
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            style={styles.container}
        >
            <View style={styles.space}> 
                <BackButton
                    onPress={() => navigation.navigate("Customer Registration Address")}
                />
                
                <Logo />
                <Text style={styles.title}>Cadastro de Email e Senha</Text>

                <View style={styles.inputs}>
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

                    <Button buttonText="Enviar" onPress={next} />
                    
                    <Progress.Bar style={styles.progressBar} progress={1} width={305} />
                </View>
            </View>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    },
    space: {
        gap: 20
    },
    title: {
        fontWeight: 700,
        fontSize: 18,
        marginBottom: 30,
        marginTop: 50
    },
    inputs: {
        gap: 20
    },
    progressBar: {
        marginTop: 60
    },
})