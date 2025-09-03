import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BackButton } from "../../components/buttons/BackButton";
import { Logo } from "../../components/display/Logo";
import { DateTimeInput } from "../../components/inputs/DateTimeInput";
import { Button } from "../../components/buttons/Button";
import { CustomerNavigationBar } from "../../components/display/CustomerNavigationBar";
import { CustomerDateProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";

export const CustomerDate: React.FC<CustomerDateProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { name } = route.params;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleConfirmTime = (selectedTime: Date) => {
    setTime(selectedTime);
    hideTimePicker();
  };

  const next = () => {
    if (!date || !time) return;

    console.log("Selecionado:", {
      data: date.toLocaleDateString(),
      hora: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      id: id,
      name: name
    });

    navigation.navigate("Professionals Available", { id, name });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.space}>
          <BackButton onPress={() => navigation.navigate("Customer Home")} />

          <Logo />
          <Text style={styles.title}>
            Pra quando seria o serviço com o profissional {name}?
          </Text>

          <View style={styles.inputs}>
            <DateTimeInput
              label="Data"
              value={date ? date.toLocaleDateString() : ""}
              placeholder="dd/mm/aaaa"
              onPressIn={showDatePicker}
            />

            <DateTimeInput
              label="Horário"
              value={
                time
                  ? time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""
              }
              placeholder="hh:mm"
              onPressIn={showTimePicker}
            />

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />

            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
            />

            <Button buttonText="Enviar" onPress={next} />
          </View>
        </View>
      </View>

      <CustomerNavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  space: {
    gap: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 30,
    marginTop: 50,
  },
  inputs: {
    gap: 20,
  },
});