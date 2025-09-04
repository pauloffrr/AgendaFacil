import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ButtonProps } from "@/src/types/ButtonType";
import { colors } from "@/src/styles/theme";

export const Button: React.FC<ButtonProps> = ({ onPress, buttonText }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: { 
    display: "flex", 
    alignItems: "flex-end" 
  }, 
  button: { 
    backgroundColor: colors.blue, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
  }, 
  buttonText: { 
    color: colors.white, 
    fontWeight: "bold", 
    fontSize: 17
  } 
});