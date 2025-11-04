import { ButtonProps } from "@/src/types/ButtonType";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/src/styles/theme";

export const DuoButtons: React.FC<ButtonProps> = ({ 
    firstOnPress,
    secondOnPress,
    firstButtonText,
    secondButtonText, 
    firstButtonColor, 
    secondButtonColor, 
    firstTextColor, 
    secondTextColor 
}) => {
    return (
        <View style={styles.buttons}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: firstButtonColor }]}
                onPress={firstOnPress}
            >
                <Text style={[styles.buttonText, { color: firstTextColor }]}>{ firstButtonText }</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: secondButtonColor }]}
                onPress={secondOnPress}
            >
                <Text style={[styles.buttonText, { color: secondTextColor }]}>{ secondButtonText }</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5%"
    },
    button: {
        paddingVertical: "3%",
        borderRadius: 8,
        width: "30%"
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    }
});