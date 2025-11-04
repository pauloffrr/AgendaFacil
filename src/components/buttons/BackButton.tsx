import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonProps } from "@/src/types/ButtonType";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/src/styles/theme";

export const BackButton: React.FC<ButtonProps> = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
      <FontAwesomeIcon icon={faChevronLeft as IconProp} style={styles.icon} size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
  },
  icon: {
    color: colors.blue
  }
});