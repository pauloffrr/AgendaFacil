import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { InputProps } from "@/src/types/InputType";
import { colors } from "@/src/styles/theme";

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType
}) => {

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: "5%"
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: colors.light_gray,
    borderRadius: 8,
    marginBottom: "5%",
    paddingHorizontal: 10,
    backgroundColor: colors.background_input,
  }
});