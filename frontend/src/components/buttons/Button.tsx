import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ButtonProps } from "@/src/types/ButtonType";

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
    backgroundColor: "#007BFF", 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
  }, 
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 15 
  } 
})