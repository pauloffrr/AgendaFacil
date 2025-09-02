import React from "react";
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface UserIconProps {
  onPress: (event: GestureResponderEvent) => void;
}

export const UserIcon: React.FC<UserIconProps> = ({ onPress }) => {
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