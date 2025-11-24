import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from "@/src/styles/theme";
import { TimeInputProps } from "@/src/types/TimeInputType";

export const TimeInput: React.FC<TimeInputProps> = ({
    startTime,
    endTime,
    onChangeStartTime,
    onChangeEndTime
}) => {
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.time}>
                <Text style={styles.label}>Hora Inicial</Text>
                <TextInput
                    style={styles.input}
                    showSoftInputOnFocus={false}
                    value={
                        startTime
                            ? startTime.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : ""
                    }
                    placeholder="hh:mm"
                    onPressIn={() => setStartTimePickerVisibility(true)}
                />

                <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={(date) => {
                        onChangeStartTime(date);
                        setStartTimePickerVisibility(false);
                    }}
                    onCancel={() => setStartTimePickerVisibility(false)}
                />
            </View>

            <View style={styles.time}>
                <Text style={styles.label}>Hora Final</Text>
                <TextInput
                    style={styles.input}
                    showSoftInputOnFocus={false}
                    value={
                        endTime
                            ? endTime.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : ""
                    }
                    placeholder="hh:mm"
                    onPressIn={() => setEndTimePickerVisibility(true)}
                />

                <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={(date) => {
                        onChangeEndTime(date);
                        setEndTimePickerVisibility(false);
                    }}
                    onCancel={() => setEndTimePickerVisibility(false)}
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