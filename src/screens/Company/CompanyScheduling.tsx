import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { SelectDate } from "@/src/components/buttons/SelectDate";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { colors } from "@/src/styles/theme";
import { Calendar } from "react-native-big-calendar";
import { CompanySchedulingProps, CompanySchedulingRouteProp } from "@/src/types/CompanyStackType";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { ApiError } from "@/src/types/ApiErrorType";
import { SchedulingEventsProps } from "@/src/types/SchedulingEventsType";
import { SchedulingProps } from "@/src/types/SchedulingType";
import { apiScheduling } from "@/src/services/Api";
import { API_URL_SCHEDULING } from "@env";
import { useUser } from "@/src/context/UserContext";

export const CompanyScheduling: React.FC<CompanySchedulingProps> = ({ navigation }) => {
    const route = useRoute<CompanySchedulingRouteProp>();
    const [scheduling, setScheduling] = useState<SchedulingEventsProps[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useUser();
    const { id } = route.params || {};

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [scrollOffsetMinutes, setScrollOffsetMinutes] = useState(0);

    React.useEffect(() => {
        if (id) {
            const event = scheduling.find((ev) => ev.id === id);
            if (event) {
                setSelectedDate(event.start);

                const minutes = event.start.getHours() * 60 + event.start.getMinutes();
                setScrollOffsetMinutes(minutes);
            }
        }
    }, [id]);

    const getSchedulingCompany = async () => {
        try {
            const response = await apiScheduling.get(`${API_URL_SCHEDULING}/scheduling-company/company/${user?.idUser}`);

            const mapped = response.data.map((item: SchedulingProps) => {
                const start = new Date(`${item.startDate}T${item.startHour}`);
                const end = new Date(`${item.endDate}T${item.endHour}`);

                return {
                    id: item.idScheduling,
                    title: item.title,
                    start,
                    end,
                    status: item.status
                };
            });

            setScheduling(mapped);
            setErrorMessage("");
        } catch (error) {
            let errorMsg = "Erro ao buscar agendamentos. Tente novamente!";
                              
            if (typeof error === 'object' && error !== null) {
                errorMsg = getErrorMessage(error as ApiError);
            } else if (typeof error === 'string') {
                errorMsg = error;
            }
    
            setErrorMessage(errorMsg);
        }
    }

    useEffect(() => {
        getSchedulingCompany();
    }, []);

    const filteredEvents = scheduling.filter((event) =>
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
                    onPressEvent={(event) => {
                        if(event.status === "CONFIRMED") {
                            navigation.navigate("Edit Event", { id: event.id })}
                        }
                    }
                    eventCellStyle={(event) => {
                        if (event.status === "CANCELLED") {
                            return { backgroundColor: colors.red };
                        }
                        return { backgroundColor: colors.blue };
                    }}
                />
            </View>

            { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }

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
    },
    errorMessage: {
        fontSize: 18,
        marginTop: "3%",
        color: colors.red,
        fontWeight: "bold"
    }
});