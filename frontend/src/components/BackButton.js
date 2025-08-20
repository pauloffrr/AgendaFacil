import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton({
    onPress
}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <FontAwesomeIcon icon={faChevronLeft} style={styles.icon} size={18} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginTop: 30,
        color: "#007BFF"
    }
})