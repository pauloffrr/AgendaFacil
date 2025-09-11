import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { SelectDate } from "@/src/components/buttons/SelectDate";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { colors } from "@/src/styles/theme";
import { Calendar } from "react-native-big-calendar";
import { CustomerSchedulingPros } from "@/src/types/CustomerSchedulingType";
import { CancelAppoimentModal } from "@/src/components/modals/CancelAppoimentModal";
import { SchedulingProps } from "@/src/types/Scheduling";
import { API_URL } from '@env';

export const CustomerScheduling: React.FC = () => {
    const [scheduling, setScheduling] = useState<CustomerSchedulingPros[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<SchedulingEventsPros | null>(null);

    const getScheduling = async () => {
        try {
            const response = await axios.get(`${API_URL}/scheduling`);
            const events = response.data.map((item: SchedulingProps) => {
            const [year, month, day] = item.date.split("-").map(Number);
            const [startHour, startMinute] = item.startTime.split(":").map(Number);
            const [endHour, endMinute] = item.endTime.split(":").map(Number);

            return {
                title: `${item.profession}`,
                start: new Date(year, month - 1, day, startHour, startMinute),
                end: new Date(year, month - 1, day, endHour, endMinute)
            };
        });
            setScheduling(events);
        } catch (error) {
            console.error("Erro ao buscar Agendamentos", error);
        }
    };

    useEffect(() => {
        getScheduling();
    }, []);

    const filteredEvents = scheduling.filter(event =>
        event.start.getDate() === selectedDate.getDate() &&
        event.start.getMonth() === selectedDate.getMonth() &&
        event.start.getFullYear() === selectedDate.getFullYear()
    );

    const handleEventPress = (event: SchedulingEventsPros) => {
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