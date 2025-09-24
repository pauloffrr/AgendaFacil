import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/src/styles/theme";
import { CompanyReportsProps } from "@/src/types/CompanyReportsType";

export const ServiceReports: React.FC<CompanyReportsProps> = ({ number, month, year, status }) => {
    const isConfirmed = status === "CONFIRMED";
    const displayText = isConfirmed 
        ? `Serviços realizados no mês de ${month} de ${year}` 
        : `Serviços cancelados no mês de ${month} de ${year}`;
    
    const numberColor = isConfirmed ? colors.blue : colors.red;

    return (
        <View style={styles.container}>
            <View style={styles.columnNumber}>
                <Text style={[styles.number, { color: numberColor }]}>{ number }</Text>
            </View>

            <View style={styles.columnText}>
                <Text style={styles.text}>{ displayText }</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems :"center",
        backgroundColor: colors.disable_input_background,
        borderRadius: 3,
        height: 200,
        width: "100%",
        paddingHorizontal: "3%",
        marginVertical: "5%"
    },
    columnNumber: {
        width: "40%",
        paddingLeft: "3%"
    },
    columnText: {
        width: "60%"
    },
    number: {
        fontWeight: "bold",
        fontSize: 80
    },
    text: {
        fontSize: 18,
        textAlign: "justify",
    }
})