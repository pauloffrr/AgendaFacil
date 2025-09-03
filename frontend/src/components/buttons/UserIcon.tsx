import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonProps } from "@/src/types/ButtonType";

export const UserIcon: React.FC<ButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesomeIcon icon={faCircleUser as IconProp} style={styles.icon} size={28} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    icon: {
        color: "#007BFF",
        marginTop: 20,
        marginBottom: 10,
    }
})