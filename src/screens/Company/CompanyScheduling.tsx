import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { SelectDate } from "@/src/components/buttons/SelectDate";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { colors } from "@/src/styles/theme";
import { Calendar } from "react-native-big-calendar";
import { CompanySchedulingMock } from "@/src/data/CompanySchedulingMock";
import { CompanySchedulingProps, CompanySchedulingRouteProp } from "@/src/types/CompanyStackType";

export const CompanyScheduling: React.FC<CompanySchedulingProps> = ({ navigation }) => {
    const route = useRoute<CompanySchedulingRouteProp>();
    const { id } = route.params || {};

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [scrollOffsetMinutes, setScrollOffsetMinutes] = useState(0);

    React.useEffect(() => {
        if (id) {
            const event = CompanySchedulingMock.find((ev) => ev.id === id);
            if (event) {
                setSelectedDate(event.start);

                const minutes = event.start.getHours() * 60 + event.start.getMinutes();
                setScrollOffsetMinutes(minutes);
            }
        }
    }, [id]);

    const filteredEvents = CompanySchedulingMock.filter((event) =>
        event.start.getDate() === selectedDate.getDate() &&
        event.start.getMonth() === selectedDate.getMonth() &&
        event.start.getFullYear() === selectedDate.getFullYear()
    );

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
                    scrollOffsetMinutes={scrollOffsetMinutes}
                    onPressEvent={(event) => navigation.navigate("Edit Event", { id: event.id })}
                />
            </View>

            <CompanyNavigationBar />
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