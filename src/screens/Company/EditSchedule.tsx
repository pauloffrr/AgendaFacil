import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { NewSchedule } from "@/src/components/display/NewSchedule";
import { DateTimeInput } from "@/src/components/inputs/DateTimeInput";
import { TimeInput } from "@/src/components/inputs/TimeInput";
import { Input } from "@/src/components/inputs/Input";
import { RepeatScheduling } from "@/src/components/display/RepeatScheduling";
import { Button } from "@/src/components/buttons/Button";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { CompanyEditScheduleProps } from "@/src/types/CompanyStackType";
import { colors } from "@/src/styles/theme";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { ApiError } from "@/src/types/ApiErrorType";
import { useUser } from "@/src/context/UserContext";
import { apiScheduling } from "@/src/services/Api";
import { API_URL_SCHEDULING } from "@env";
import { formatCurrency, cleanCurrency } from "@/src/utils/currencyFormatter";

export const EditSchedule: React.FC<CompanyEditScheduleProps> = ({ navigation }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const [title, setTitle] = useState("");
    const [budget, setBudget] = useState("");
    const [startHourDate, setStartHourDate] = useState<Date | null>(null);
    const [endHourDate, setEndHourDate] = useState<Date | null>(null);
    const [newSchedule, setNewSchedule] = useState("");
    const [repeatScheduling, setRepeatScheduling] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useUser();
    
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    
    const handleConfirmDate = (selectedDate: Date) => {
        setDate(selectedDate);
        hideDatePicker();
    };

    const formatDate = (date: Date | null): string | null => {
        if (!date) return null;
        return date.toISOString().split('T')[0]; 
    };

    const formatTime = (hour: Date | null): string | null => {
        if (!hour) return null;
        return hour.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const handleBudgetChange = (text: string) => {
        const formattedText = formatCurrency(text);
        setBudget(formattedText);
    };

    const createScheduling = async () => {
        const cleanedBudget = cleanCurrency(budget);
        const budgetString = cleanedBudget ? String(cleanedBudget) : null;
        
        try {
            const payloadSchedulingCompany = {
                companyId: user?.idUser,
                title: title,
                startDate: formatDate(date),
                endDate: formatDate(date),
                startHour: formatTime(startHourDate),
                endHour: formatTime(endHourDate),
                repeatScheduling: repeatScheduling,
                status: newSchedule,
                budget: budgetString ? Number(budgetString) : null
            }
            await apiScheduling.post(
                `${API_URL_SCHEDULING}/scheduling-company`,
                payloadSchedulingCompany
            );

            setErrorMessage("");

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

                <Text style={styles.title}>O que deseja fazer?</Text>

                <View style={styles.inputs}>
                    <NewSchedule 
                        value={newSchedule}
                        onChangeValue={setNewSchedule}
                    />

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

                    <RepeatScheduling 
                        value={repeatScheduling}
                        onChangeValue={setRepeatScheduling}
                    />

                    <Input 
                        label="Orçamento"
                        placeholder="Digite o orçamento do serviço"
                        value={budget}
                        onChangeText={handleBudgetChange}
                        keyboardType="numeric"
                    />
        
                    <Button 
                        buttonText="Enviar" 
                        onPress={async () => {
                            await createScheduling();
                            navigation.navigate("Company Scheduling", {});
                        }} 
                    />

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