import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { DateTimeInput } from "@/src/components/inputs/DateTimeInput";
import { TimeInput } from "@/src/components/inputs/TimeInput";
import { Input } from "@/src/components/inputs/Input";
import { Button } from "@/src/components/buttons/Button";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { CompanyEditEventProps, CompanyEditEventRouteProp } from "@/src/types/CompanyStackType";
import { colors } from "@/src/styles/theme";
import { SchedulingEventsProps } from "@/src/types/SchedulingEventsType";
import { apiNotifications, apiScheduling, apiUsers } from "@/src/services/Api";
import { API_URL_NOTIFICATIONS, API_URL_SCHEDULING, API_URL_USERS } from "@env";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { ApiError } from "@/src/types/ApiErrorType";
import { useUser } from "@/src/context/UserContext";
import { Professional } from "@/src/types/ProfessionalType";
import { formatCurrency, cleanCurrency } from "@/src/utils/currencyFormatter";

export const EditEvent: React.FC<CompanyEditEventProps> = ({ navigation }) => {
    const route = useRoute<CompanyEditEventRouteProp>();
    const { id } = route.params;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const [title, setTitle] = useState("");
    const [budget, setBudget] = useState("");
    const [scheduling, setScheduling] = useState<SchedulingEventsProps | null>(null);
    const [company, setCompany] = useState<Professional | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [startHourDate, setStartHourDate] = useState<Date | null>(null);
    const [endHourDate, setEndHourDate] = useState<Date | null>(null);
    const { user } = useUser();

    const getScheduling = async () => {
        try {
            const response = await apiScheduling.get(`${API_URL_SCHEDULING}/scheduling-company/${id}`);

            const data = response.data;

            const start = new Date(`${data.startDate}T${data.startHour}:00`);
            const end = new Date(`${data.endDate}T${data.endHour}:00`);

            setScheduling({
                ...data,
                start,
                end
            });

            setStartHourDate(start);
            setEndHourDate(end);
            setDate(start);
            setTitle(data.title);
            setBudget(String(data.budget ?? ""));

            setErrorMessage("");
        } catch (error) {
            let errorMsg = "Erro ao buscar o agendamento. Tente novamente!";
                                          
            if (typeof error === 'object' && error !== null) {
                errorMsg = getErrorMessage(error as ApiError);
            } else if (typeof error === 'string') {
                errorMsg = error;
            }
    
            setErrorMessage(errorMsg);
        }
    }

    const getProfessionCompany = async () => {
        try {
            const response = await apiUsers.get(`${API_URL_USERS}/company/${user?.idUser}`);

            setCompany(response.data);
            setErrorMessage("");

        } catch (error) {
            let errorMsg = "Erro ao buscar o agendamento. Tente novamente!";
                                          
            if (typeof error === 'object' && error !== null) {
                errorMsg = getErrorMessage(error as ApiError);
            } else if (typeof error === 'string') {
                errorMsg = error;
            }
    
            setErrorMessage(errorMsg);
        }
    }

    const dayWeek = scheduling?.start?.toLocaleDateString("pt-BR", { weekday: "long" });
    const fullDate = scheduling?.start.toLocaleDateString("pt-BR");
    const hour = scheduling?.start.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    
    const handleConfirmDate = (selectedDate: Date) => {
        setDate(selectedDate);
        hideDatePicker();
    };

    const handleBudgetChange = (text: string) => {
        const formattedText = formatCurrency(text);
        setBudget(formattedText);
    };

    const updateScheduling = async () => {
        const formatDate = (date: Date | null): string | null => {
            if (!date) return null;
            return date.toISOString().split('T')[0]; 
        };

        const formatTime = (hour: Date | null): string | null => {
            if (!hour) return null;
            return hour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
        };

        const cleanedBudget: string = cleanCurrency(budget);
        const budgetAsFloat = parseFloat(cleanedBudget);

        try {
            const payloadSchedulingCompany = {
                title: title,
                startDate: formatDate(date),
                endDate: formatDate(date),
                startHour: formatTime(startHourDate),
                endHour: formatTime(endHourDate),
                budget: budgetAsFloat
            }
            await apiScheduling.put(`${API_URL_SCHEDULING}/scheduling-company/${id}`, payloadSchedulingCompany);

            const payloadSchedulingCustomer = {
                title: title,
                startDate: formatDate(date),
                endDate: formatDate(date),
                startHour: formatTime(startHourDate),
                endHour: formatTime(endHourDate)
            }
            await apiScheduling.put(`${API_URL_SCHEDULING}/scheduling-customer/${scheduling?.schedulingCustomerId}`, payloadSchedulingCustomer);

            const payloadNotificationCustomer = {
                customerId: scheduling?.customerId,
                companyId: user?.idUser,
                type: 'Lembrete',
                text: `${user?.name} atualizou o seu agendamento de ${scheduling?.startDate} das ${scheduling?.startHour} até ${scheduling?.endHour}.`,
                profession: company?.profession,
                date: new Date()
            }
            await apiNotifications.post(`${API_URL_NOTIFICATIONS}/notifications-customer`, payloadNotificationCustomer);

            await getScheduling();

        } catch (error) {
            let errorMsg = "Erro ao atualizar o agendamento. Tente novamente!";
                                          
            if (typeof error === 'object' && error !== null) {
                errorMsg = getErrorMessage(error as ApiError);
            } else if (typeof error === 'string') {
                errorMsg = error;
            }
    
            setErrorMessage(errorMsg);
        }
    }

    useEffect(() => {
        getScheduling();
        getProfessionCompany();
    }, []);

    return (
        <View style={styles.screen}>
            <KeyboardAwareScrollView
                style={styles.container}
                enableOnAndroid
                extraScrollHeight={104}
            >
                <BackButton />

                <View style={styles.header}>
                    <Logo />
                    <UserIcon />
                </View>

                <Text style={styles.title}>Editar o horário de { dayWeek } { fullDate } - { hour }</Text>

                <View style={styles.inputs}>
                    <DateTimeInput
                        label="Data"
                        value={date ? date.toLocaleDateString() : ""}
                        placeholder="dd/mm/aaaa"
                        onPressIn={showDatePicker}
                    />

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                    />

                    <TimeInput 
                        startTime={startHourDate}
                        endTime={endHourDate}
                        onChangeStartTime={setStartHourDate}
                        onChangeEndTime={setEndHourDate}
                    />

                    <Input 
                        label="Título"
                        placeholder="Digite o título do agendamento"
                        value={title}
                        onChangeText={setTitle}
                        keyboardType="default"
                    />

                    <Input 
                        label="Orçamento"
                        placeholder="Digite o orçamento do serviço"
                        value={budget}
                        onChangeText={handleBudgetChange}
                        keyboardType="numeric"
                    />
        
                    <Button buttonText="Salvar" onPress={() => {navigation.navigate("Company Scheduling", { id }), updateScheduling()}} />
                </View>

            </KeyboardAwareScrollView>

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
        padding: "5%",
        backgroundColor: colors.white
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "20%"
    },
    title: {
        fontWeight: "700",
        fontSize: 18,
        marginBottom: "5%",
        marginTop: "10%",
    },
    inputs: {
        marginBottom: "15%"
    },
    errorMessage: {
        fontSize: 18,
        marginTop: "3%",
        color: colors.red,
        fontWeight: "bold"
    }
});