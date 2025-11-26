import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/src/styles/theme";
import { CompanyReportsProps } from "@/src/types/CompanyReportsType";
import { MonthsMock } from "@/src/data/MonthsMock";

export const EarningsServiceReports: React.FC<CompanyReportsProps> = ({ number, month, year }) => {
    const monthName = MonthsMock.find(m => m.id === month)?.month || month;

    return (
        <View style={styles.container}>
            <Text style={styles.number}>{ number?.toFixed(2) }</Text>
            <Text style={styles.text}>De ganhos total no mês de {monthName} de {year}</Text>
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
        fontSize: 80,
        color: colors.blue
    },
    text: {
        fontSize: 16,
        textAlign: "justify"
    }
})