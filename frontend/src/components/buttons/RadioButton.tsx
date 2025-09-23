import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RadioButtonProps } from "@/src/types/RadioButtonType";
import { colors } from "@/src/styles/theme";

export const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selectedValue, onSelect }) => {
  const isSelected = value === selectedValue;

    return (
        <TouchableOpacity onPress={() => onSelect(value)} style={styles.radioContainer}>
            <View style={[styles.outerCircle, isSelected && styles.outerCircleSelected]}>
                {isSelected && <View style={styles.innerCircle} />}
            </View>
            
            <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "5%"
    },
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.black,
        alignItems: "center",
        justifyContent: "center",
        marginRight: "3%"
    },
    outerCircleSelected: {
        borderColor: colors.blue
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: colors.blue
    },
    radioLabel: {
        fontSize: 16
    }
});