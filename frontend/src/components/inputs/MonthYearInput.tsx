import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MonthsMock } from "@/src/data/MonthsMock";
import { colors } from "@/src/styles/theme";

export const MonthYearInput: React.FC = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const years = Array.from({ length: 51 }, (_, i) => currentYear - i);

    const getSelectableMonths = () => {
        if (year === currentYear) {
            return MonthsMock.slice(0, currentMonth);
        }
        return MonthsMock;
    };

    return (
        <View style={styles.container}>
            <View style={styles.date}>
                <Text style={styles.label}>Ano</Text>

                <Picker selectedValue={year} onValueChange={(value) => setYear(value)} style={styles.input}>
                    {years.map((year) => (
                        <Picker.Item key={year} label={String(year)} value={year} />
                    ))}
                </Picker>
            </View>

            <View style={styles.date}>
                <Text style={styles.label}>Mês</Text>
                
                <Picker selectedValue={month} onValueChange={(value) => setMonth(value)} style={styles.input}>
                    {getSelectableMonths().map((month, increment) => (
                        <Picker.Item key={increment} label={month.month} value={increment + 1} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: "5%",
        marginVertical: "10%"
    },
    date: {
        flex: 1,
        width: "50%"
    },
    label: {
        alignSelf: "flex-start",
        marginBottom: 5,
        fontWeight: "bold"
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: colors.light_gray,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: colors.background_input
    }
});