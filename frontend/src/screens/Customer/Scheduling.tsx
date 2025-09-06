import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
//import { SchedulingMock } from "@/src/data/SchedulingMock";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { SelectDate } from "@/src/components/buttons/SelectDate";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { colors } from "@/src/styles/theme";
import { Calendar } from "react-native-big-calendar";

const events = [
  {
    title: "Reunião",
    start: new Date(2025, 8, 6, 10, 0),
    end: new Date(2025, 8, 6, 11, 0),
  },
  {
    title: "Dentista",
    start: new Date(2025, 8, 7, 15, 0),
    end: new Date(2025, 8, 7, 16, 0),
  },
];

export const CustomerScheduling: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleProfile = () => {
        console.log("Perfil");
    };

    const filteredEvents = events.filter((event) =>
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
                />

                { /* <FlatList
                    data={SchedulingMock}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    <View style={styles.scheduleBox}>
                        <Text style={styles.time}>{item.time}</Text>
                        <View style={styles.scheduleContent}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.address}>{item.address}</Text>
                        </View>
                    </View>
                    )}
                /> */ }
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