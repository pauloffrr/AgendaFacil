import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/src/styles/theme";
import { CompanyReportsProps } from "@/src/types/CompanyReportsType";
import { MonthsMock } from "@/src/data/MonthsMock";

export const ServiceReports: React.FC<CompanyReportsProps> = ({ number, month, year, status }) => {
    const isConfirmed = status === "CONFIRMED";

    const monthName = MonthsMock.find(m => m.id === month)?.month || month;

    const displayText = isConfirmed 
        ? `Serviços realizados no mês de ${monthName} de ${year}` 
        : `Serviços cancelados no mês de ${monthName} de ${year}`;

    const numberColor = isConfirmed ? colors.blue : colors.red;

    return (
        <View style={styles.container}>
            <Text style={[styles.number, { color: numberColor }]}>{ number }</Text>
            <Text style={styles.text}>{ displayText }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent :"center",
        alignItems: "center",
        backgroundColor: colors.disable_input_background,
        borderRadius: 3,
        height: 200,
        width: "100%",
        paddingHorizontal: "3%",
        marginVertical: "5%"
    },
    number: {
        fontWeight: "bold",
        fontSize: 80
    },
    text: {
        fontSize: 16,
        textAlign: "justify",
    }
})