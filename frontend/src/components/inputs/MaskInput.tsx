import React from "react";
import { View, Text, StyleSheet, KeyboardTypeOptions } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

interface MaskInputProps {
  label?: string;
  mask?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export const MaskInput: React.FC<MaskInputProps> = ({
  label,
  mask,
  placeholder,
  value,
  onChangeText,
  keyboardType
}) => {

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <MaskedTextInput
        style={styles.input}
        mask={mask}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
  }
});