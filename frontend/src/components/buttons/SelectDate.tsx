import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SelectDateProps } from "@/src/types/SelectDateType";
import { colors } from "@/src/styles/theme";

export const SelectDate: React.FC<SelectDateProps> = ({ selectedDate, onDateChange }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [days, setDays] = useState(() => getWeekDays(selectedDate));

    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    function getWeekDays(date: Date) {
        const daysList = [];

        for (let counter = -2; counter <= 2; counter++) {
            const day = new Date(date);

            day.setDate(date.getDate() + counter);
            daysList.push(day);
        }
        return daysList;
    };

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirmPicker = (date: Date) => {
        onDateChange(date);
        setDays(getWeekDays(date));
        hideDatePicker();
    };

    const handleSelectDay = (day: Date) => {
        onDateChange(day);
    };

    return (
        <View>
            <TouchableOpacity onPress={showDatePicker} style={styles.buttonDate}>
                <Text style={styles.date}>
                    {selectedDate.toLocaleString("pt-BR", {
                        month: "long",
                        year: "numeric",
                    })} 
                </Text>
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
            </TouchableOpacity>
            
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={selectedDate}
                onConfirm={handleConfirmPicker}
                onCancel={hideDatePicker}
            />
            
            <View style={styles.daysRow}>
                {days.map((day, index) => {
                    const isSelected =
                        day.getDate() === selectedDate.getDate() &&
                        day.getMonth() === selectedDate.getMonth() &&
                        day.getFullYear() === selectedDate.getFullYear();

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dayBox, isSelected && styles.daySelected]}
                            onPress={() => handleSelectDay(day)}
                        >
                            <Text style={[styles.dayText, isSelected && { color: colors.white }]}>
                                {dayNames[day.getDay()]}
                            </Text>

                            <Text style={[styles.dateText, isSelected && { color: colors.white }]}>
                                {day.getDate().toString().padStart(2, "0")}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonDate: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "10%",
    },
    date: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    daysRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "10%",
        width: "100%",
        gap: 5
    },
    dayBox: {
        alignItems: "center",
        padding: "3%",
        borderRadius: 8,
        backgroundColor: colors.disable_input_background,
        width: "18%"
    },
    daySelected: {
        backgroundColor: colors.blue,
        color: colors.white
    },
    dayText: {
        fontSize: 12,
        color: colors.black,
    },
    dateText: {
        fontSize: 14,
        fontWeight: "bold",
    }
});