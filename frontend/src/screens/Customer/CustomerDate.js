import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BackButton } from "../../components/layout/BackButton";
import Logo from "../../components/Logo";
import DateTimeInput from "../../components/DateTimeInput";
import Button from "../../components/Button";
import CustomerNavigationBar from "../../components/CustomerNavigationBar";

export default function CustomerDate({ navigation, route }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const { name } = route.params;

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirmDate = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const handleConfirmTime = (time) => {
    setTime(time);
    hideTimePicker();
  };

  const next = () => {
    console.log("Selecionado:", {
      data: date.toLocaleDateString(),
      hora: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    navigation.navigate("Professionals Available", { name: name});
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.space}>
          <BackButton onPress={() => navigation.navigate("Customer Home")} />

          <Logo />
          <Text style={styles.title}>Pra quando seria o serviço com o profissional { name }?</Text>

          <View style={styles.inputs}>
            <DateTimeInput
              label="Data"
              value={date ? date.toLocaleDateString() : ""}
              placeholder="dd/mm/aaaa"
              onPressIn={showDatePicker}
              editable={false}
            />

            <DateTimeInput
              label="Horário"
              value={time ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
              placeholder="hh:mm"
              onPressIn={showTimePicker}
            />

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
              headerTextIOS="Escolha uma Data"
            />

            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
              headerTextIOS="Escolha um Horário"
            />

            <Button buttonText="Enviar" onPress={next} />
          </View>
        </View>
      </View>

      <CustomerNavigationBar navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  }
});