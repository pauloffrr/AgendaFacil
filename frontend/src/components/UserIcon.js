import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function UserIcon({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesomeIcon icon={faCircleUser} style={styles.icon} size={28} />
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