import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { SelectDate } from "@/src/components/buttons/SelectDate";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { colors } from "@/src/styles/theme";
import { Calendar } from "react-native-big-calendar";
import { CustomerSchedulingMock } from "@/src/data/CustomerSchedulingMock";
import { CustomerSchedulingPros } from "@/src/types/CustomerSchedulingType";
import { CancelAppoimentModal } from "@/src/components/modals/CancelAppoimentModal";

export const CustomerScheduling: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CustomerSchedulingPros | null>(null);

    const filteredEvents = CustomerSchedulingMock.filter((event) =>
        event.start.getDate() === selectedDate.getDate() &&
        event.start.getMonth() === selectedDate.getMonth() &&
        event.start.getFullYear() === selectedDate.getFullYear()
    );

    const handleEventPress = (event: CustomerSchedulingPros) => {
        setSelectedEvent(event);
        setModalVisible(true);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Logo />
                    <UserIcon />
                </View>

                <SelectDate selectedDate={selectedDate} onDateChange={setSelectedDate} />

                <Calendar
                    events={filteredEvents}
                    height={700}
                    mode="day"
                    date={selectedDate}
                    renderHeader={() => null}
                    onPressEvent={handleEventPress}
                />
            </View>

            <CancelAppoimentModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={() => {
                    console.log("Evento:", selectedEvent);
                    setModalVisible(false);
                }}
            />

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
    }
});