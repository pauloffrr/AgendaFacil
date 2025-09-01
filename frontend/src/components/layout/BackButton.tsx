import React from "react";
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface BackButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  size?: number;        // tamanho opcional do ícone
  color?: string;       // cor opcional do ícone
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  size = 18,
  color = "#007BFF",
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <FontAwesomeIcon icon={faChevronLeft as IconProp} style={{ color }} size={size} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});