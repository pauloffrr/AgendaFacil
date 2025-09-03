import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InputProps } from "@/src/types/InputType";

export const PasswordInput: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChangeText
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                >
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={22}
                        color="#666"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        alignSelf: "flex-start",
        marginBottom: 5,
        fontWeight: "bold",
    },
    passwordContainer: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    }
})