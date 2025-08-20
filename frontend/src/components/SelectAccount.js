import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomerRegistrationData from "../screens/CustomerRegistrationData";
import CompanyRegistrationData from "../screens/CompanyRegistrationData";

export default function SelectAccount() {
    const route = useRoute();
    const navigation = useNavigation();
    const selected = route.name === "Customer Registration Data" ? "Cliente" : "Empresa"

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[selected === "Cliente" ? styles.activeButton : styles.inactiveButton, styles.leftButton]}
                onPress={() => navigation.navigate("Customer Registration Data", {CustomerRegistrationData})}
            >
                <Text style={selected === "Cliente" ? styles.activeText : styles.inactiveText}>
                    Cliente
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[selected === "Empresa" ? styles.activeButton : styles.inactiveButton, styles.rightButton]}
                onPress={() => navigation.navigate("Company Registration Data", {CompanyRegistrationData})}
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
        marginBottom: 20
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