import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { SelectDate } from "@/src/components/buttons/SelectDate";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { colors } from "@/src/styles/theme";
import { Calendar } from "react-native-big-calendar";
import { CustomerSchedulingMock } from "@/src/data/CustomerSchedulingMock"

export const CustomerScheduling: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleProfile = () => {
        console.log("Perfil");
    };

    const filteredEvents = CustomerSchedulingMock.filter((event) =>
        event.start.getDate() === selectedDate.getDate() &&
        event.start.getMonth() === selectedDate.getMonth() &&
        event.start.getFullYear() === selectedDate.getFullYear()
    );

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Logo />
                    <UserIcon onPress={handleProfile}/>
                </View>

                <SelectDate selectedDate={selectedDate} onDateChange={setSelectedDate} />

                <Calendar
                    events={filteredEvents}
                    height={700}
                    mode="day"
                    date={selectedDate}
                    renderHeader={() => null}
                />
            </View>

            <CustomerNavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: "5%"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "20%"
    },
    scheduleBox: {
        marginBottom: 12,
    },
    time: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    scheduleContent: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 8,
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    description: {
        color: "#fff",
        fontSize: 12,
    },
    address: {
        color: "#fff",
        fontSize: 12,
    }
});