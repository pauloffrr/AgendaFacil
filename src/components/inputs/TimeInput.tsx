import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from "@/src/styles/theme";

export const TimeInput: React.FC = () => {
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    
    const showStartTimePicker = () => setStartTimePickerVisibility(true);
    const hideStartTimePicker = () => setStartTimePickerVisibility(false);
    const showEndTimePicker = () => setEndTimePickerVisibility(true);
    const hideEndTimePicker = () => setEndTimePickerVisibility(false);
    
    const handleConfirmStartTime = (selectedStartTime: Date) => {
        setStartTime(selectedStartTime);
        hideStartTimePicker();
    };

    const handleConfirmEndTime = (selectedEndTime: Date) => {
        setEndTime(selectedEndTime);
        hideEndTimePicker();
    };

    return (
        <View style={styles.container}>
            <View style={styles.time}>
                <Text style={styles.label}>Hora Inicial</Text>
                <TextInput
                    style={styles.input}
                    showSoftInputOnFocus={false}
                    value={
                        startTime ? startTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }) : ""
                        }
                    placeholder="hh:mm"
                    onPressIn={showStartTimePicker}
                />

                <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmStartTime}
                    onCancel={hideStartTimePicker}
                />
            </View>

            <View style={styles.time}>
                <Text style={styles.label}>Hora Final</Text>
                <TextInput
                    style={styles.input}
                    showSoftInputOnFocus={false}
                    value={
                        endTime ? endTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }) : ""
                        }
                    placeholder="hh:mm"
                    onPressIn={showEndTimePicker}
                />

                <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmEndTime}
                    onCancel={hideEndTimePicker}
                />
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
        marginVertical: "5%"
    },
    time: {
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