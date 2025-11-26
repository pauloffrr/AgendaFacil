import React, { useEffect, useState, useMemo } from "react";
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
import { DeleteSchedulingBlocked } from "@/src/components/modals/DeleteSchedulingBlocked";
import { generateRecurringEventsForDay } from "@/src/utils/ExpandEvents";

export const CompanyScheduling: React.FC<CompanySchedulingProps> = ({ navigation }) => {
    const route = useRoute<CompanySchedulingRouteProp>();
    const [scheduling, setScheduling] = useState<SchedulingEventsProps[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<SchedulingEventsProps | null>(null);
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
    }, [id, scheduling]);

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
                    status: item.status,
                    repeatScheduling: item.repeatScheduling as SchedulingEventsProps['repeatScheduling'] || 'NO', 
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

    const handleEventPress = (event: SchedulingEventsProps) => {
        setSelectedEvent(event);
        setModalVisible(true);
    }

    const deleteSchedulingBlocked = async (id: number) => {
        const event = scheduling.find(item => item.id === id);

        if (!event) {
            setErrorMessage("Agendamento não encontrado");
            return;
        }

        try {
            await apiScheduling.delete(`${API_URL_SCHEDULING}/scheduling-company/${id}`);

            setErrorMessage("");
            await getSchedulingCompany();

        } catch (error) {
            let errorMsg = "Erro ao excluir agendamento bloqueado. Tente novamente!";
                              
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

    const displayedEvents = useMemo(() => {
        return generateRecurringEventsForDay(scheduling, selectedDate);
    }, [scheduling, selectedDate]);

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Logo />
                    <UserIcon />
                </View>

                <SelectDate selectedDate={selectedDate} onDateChange={setSelectedDate} />

                <Calendar
                    events={displayedEvents}
                    height={700}
                    mode="day"
                    date={selectedDate}
                    renderHeader={() => null}
                    scrollOffsetMinutes={scrollOffsetMinutes}
                    onPressEvent={(event) => {
                        if(event.status === "CONFIRMED") {
                            navigation.navigate("Edit Event", { id: event.id });
                        } else if (event.status === "BLOCKED") {
                            handleEventPress(event)
                        }
                    }}
                    eventCellStyle={(event) => {
                        if (event.status === "CANCELLED") {
                            return { backgroundColor: colors.red };
                        } else if (event.status === "BLOCKED") {
                            return { backgroundColor: colors.gray };
                        }
                        return { backgroundColor: colors.blue };
                    }}
                />
            </View>

            <DeleteSchedulingBlocked
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={() => {
                    if (selectedEvent?.id) {
                        deleteSchedulingBlocked(selectedEvent.id);
                    }
                    setModalVisible(false);
                }}
            />

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