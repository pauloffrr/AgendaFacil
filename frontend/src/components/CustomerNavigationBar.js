import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faCircleExclamation, faCalendarDays, faStar } from "@fortawesome/free-solid-svg-icons";

export default function CustomerNavigationBar() {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <FontAwesomeIcon icon={faHome} style={styles.icon} size={22} />
                <Text style={styles.text}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <FontAwesomeIcon icon={faCircleExclamation} style={styles.icon} size={22} />
                <Text style={styles.text}>Notificações</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <FontAwesomeIcon icon={faCalendarDays} style={styles.icon} size={22} />
                <Text style={styles.text}>Agendamentos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <FontAwesomeIcon icon={faStar} style={styles.icon} size={22} />
                <Text style={styles.text}>Favoritos</Text>
            </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#CCC",
        padding: 20
    },
    button: {
        alignItems: "center"
    },
    icon: {
        color: "#007BFF"
    },
    text: {
        fontSize: 10,
        fontWeight: 600
    }
})