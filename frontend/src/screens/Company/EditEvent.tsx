import React, { useState } from "react";
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
import { CompanyEditEventProps } from "@/src/types/CompanyStackType";
import { CompanySchedulingMock } from "@/src/data/CompanySchedulingMock";

export const EditEvent: React.FC<CompanyEditEventProps> = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params as { id: number };
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState<Date | null>(null);
    const [title, setTitle] = useState("");
    const [budget, setBudget] = useState("");

    const event = CompanySchedulingMock.find((event) => event.id === id);

    const dayWeek = event?.start.toLocaleDateString("pt-BR", { weekday: "long" });
    const fullDate = event?.start.toLocaleDateString("pt-BR");
    const hour = event?.start.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    
    const handleConfirmDate = (selectedDate: Date) => {
        setDate(selectedDate);
        hideDatePicker();
    };

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

                    <TimeInput />

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
                        onChangeText={setBudget}
                        keyboardType="numeric"
                    />
        
                    <Button buttonText="Enviar" onPress={() => navigation.navigate("Company Scheduling", { id: id })} />
                </View>

            </KeyboardAwareScrollView>

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
        padding: "5%"
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
    }
});