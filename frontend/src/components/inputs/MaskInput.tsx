import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { MaskInputProps } from "@/src/types/InputType";
import { colors } from "@/src/styles/theme";

export const MaskInput: React.FC<MaskInputProps> = ({
  label,
  mask,
  placeholder,
  value,
  onChangeTextMask,
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
        onChangeText={onChangeTextMask}
        keyboardType={keyboardType}
      />
    </View>
  );
};

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
    borderColor: colors.light_gray,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.background_input,
  }
});