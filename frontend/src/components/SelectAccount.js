import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SelectAccount() {
    const [selected, setSelected] = useState("Cliente");

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[selected === "Cliente" ? styles.activeButton : styles.inactiveButton, styles.leftButton]}
                onPress={() => setSelected("Cliente")}
            >
                <Text style={selected === "Cliente" ? styles.activeText : styles.inactiveText}>
                    Cliente
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[selected === "Empresa" ? styles.activeButton : styles.inactiveButton, styles.rightButton]}
                onPress={() => setSelected("Empresa")}
            >
                <Text style={selected === "Empresa" ? styles.activeText : styles.inactiveText}>
                    Empresa
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 30
    }, 

    activeButton: {
        backgroundColor: "#007BFF",
        padding: 12,
    },

    activeText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 18
    },

    inactiveButton: {
        backgroundColor: "#CCC",
        padding: 12,
    },

    inactiveText: {
        fontWeight: "bold",
        fontSize: 18 
    },

    leftButton: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },

    rightButton: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    }
})