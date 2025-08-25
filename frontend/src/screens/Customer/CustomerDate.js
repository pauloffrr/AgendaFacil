import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackButton from "../../components/BackButton";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function CustomerDate({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      setDateText(currentDate.toLocaleDateString("pt-BR"));
      toggleDatePicker();
    } else {
      toggleDatePicker();
    }
  };

  const next = () => {
    console.log("Selecionar data:", { date });
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid style={styles.container}>
      <View style={styles.space}>
        <BackButton onPress={() => navigation.navigate("Customer Home")} />

        <Logo />
        <Text style={styles.title}>Pra quando seria o serviço?</Text>

        <View style={styles.inputs}>
          <Input
            label="Data"
            value={dateText}
            onChangeText={setDateText}
            placeholder="dd/mm/aaaa"
            onFocus={toggleDatePicker}
          />

          {showDatePicker && (
            <DatePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
            />
          )}

          <Button buttonText="Enviar" onPress={next} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  progressBar: {
    marginTop: 60,
  },
});