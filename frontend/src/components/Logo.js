import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

export default function Logo() {
    return (
        <View>
            <Text style={styles.title}>
                <Ionicons
                    name={"calendar"}
                    size={22}
                    color="#007BFF"
                /> AgendaFácil
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#007BFF",
        marginBottom: 10,
        marginTop: 20
    }
})