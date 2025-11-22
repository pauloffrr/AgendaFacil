import { SelectDate } from "@/src/components/buttons/SelectDate";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { Logo } from "@/src/components/display/Logo";
import { CancelAppoimentModal } from "@/src/components/modals/CancelAppoimentModal";
import { useUser } from "@/src/context/UserContext";
import { apiNotifications, apiScheduling } from "@/src/services/Api";
import { colors } from "@/src/styles/theme";
import { ApiError } from "@/src/types/ApiErrorType";
import { SchedulingEventsProps } from "@/src/types/SchedulingEventsType";
import { SchedulingProps } from "@/src/types/SchedulingType";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { API_URL_NOTIFICATIONS, API_URL_SCHEDULING } from '@env';
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Calendar } from "react-native-big-calendar";

export const CustomerScheduling: React.FC = () => {
    const [scheduling, setScheduling] = useState<SchedulingEventsProps[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<SchedulingEventsProps | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useUser();

    const getSchedulingCustomer = async () => {
        try {
            const response = await apiScheduling.get(`${API_URL_SCHEDULING}/scheduling-customer/customer/${user?.idUser}`);

            const mapped = response.data.map((item: SchedulingProps) => {
                const start = new Date(`${item.startDate}T${item.startHour}`);
                const end = new Date(`${item.endDate}T${item.endHour}`);

                return {
                    id: item.idScheduling,
                    companyId: item.company.idCompany,
                    customerId: item.customer.idCustomer,
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
    };

    useEffect(() => {
        getSchedulingCustomer();
    }, []);

    const filteredEvents = scheduling.filter((event) =>
        event.start.getDate() === selectedDate.getDate() &&
        event.start.getMonth() === selectedDate.getMonth() &&
        event.start.getFullYear() === selectedDate.getFullYear()
    );

    const handleEventPress = (event: SchedulingEventsProps) => {
        setSelectedEvent(event);
        setModalVisible(true);
    }

    const cancelScheduling = async (id: number) => {
        try {
            const event = scheduling.find(item => item.id === id);

            if (!event) {
                setErrorMessage("Agendamento não encontrado");
                return;
            }

            const day = event.start.toLocaleDateString('pt-BR');
            const startHour = event.start.toLocaleTimeString('pt-BR', { hour: "2-digit", minute: "2-digit" });
            const endHour = event.end.toLocaleTimeString('pt-BR', { hour: "2-digit", minute: "2-digit" });

            const payloadNotification = {
                companyId: event.companyId,
                customerId: user?.idUser,
                type: 'Cancelado',
                text: `${user?.name} cancelou o agendamento com você no dia ${day} das ${startHour} às ${endHour}`,
                street: user?.street,
                number: user?.number,
                schedulingDate: event.start.toISOString(),
                schedulingStartTime: startHour,
                schedulingEndTime: endHour,
                date: new Date()
            };
            await apiNotifications.post(`${API_URL_NOTIFICATIONS}/notifications-company`, payloadNotification);

            await apiScheduling.put(`${API_URL_SCHEDULING}/scheduling-customer/${id}`, { status: "CANCELLED" });

            setScheduling(prev =>
                prev.map(event =>
                    event.id === id ? { ...event, status: "CANCELLED", color: colors.red } : event
                )
            );
        } catch (error) {
            console.error("Erro ao cancelar agendamento", error);
        }
    };

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
                    onPressEvent={(event) => {
                        if(event.status === "CONFIRMED") {
                            handleEventPress
                        }
                    }}
                    eventCellStyle={(event) => {
                        if (event.status === "CANCELLED") {
                            return { backgroundColor: colors.red };
                        }
                        return { backgroundColor: colors.blue };
                    }}
                />
            </View>

            <CancelAppoimentModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={() => {
                    if (selectedEvent?.id) {
                        cancelScheduling(selectedEvent.id);
                    }
                    setModalVisible(false);
                }}
            />

            { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }

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
    errorMessage: {
        fontSize: 18,
        marginTop: "3%",
        color: colors.red,
        fontWeight: "bold"
    }
});