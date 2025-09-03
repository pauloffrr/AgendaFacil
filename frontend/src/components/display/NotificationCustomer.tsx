import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { NotificationsCustomerMock } from "../../data/NotificationCustomerMock";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarCheck, faCalendarXmark, faBell } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CustomerModal } from "../modals/CustomerModal";
import { Notification } from "../../types/NotificationType";
import { colors } from "@/src/styles/theme";

export const NotificationCustomer: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(NotificationsCustomerMock);
  const [modalVisible, setModalVisible] = useState(false);

  const handleReview = (id: number) => {
    setModalVisible(true);

    setNotifications((prev) =>
      prev.map((item) => {
        if (item.id === id && item.type === "Avaliação") {
          return {
            ...item,
            type: "Concluído",
            message: "Serviço concluído com sucesso.",
          };
        }
        return item;
      })
    );
  };

  const renderIcon = (type: Notification["type"]) => {
    switch (type) {
      case "Cancelamento":
        return (
          <FontAwesomeIcon
            icon={faCalendarXmark as IconProp}
            size={22}
            color={colors.red}
          />
        );
      case "Confirmação":
        return (
          <FontAwesomeIcon
            icon={faCalendarCheck as IconProp}
            size={22}
            color={colors.green}
          />
        );
      case "Avaliação":
      case "Concluído":
        return (
          <FontAwesomeIcon
            icon={faCalendarCheck as IconProp}
            size={22}
            color={colors.blue}
          />
        );
      case "Lembrete":
        return (
          <FontAwesomeIcon
            icon={faBell as IconProp}
            size={22}
            color={colors.blue}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.professionName}>{item.professionName}</Text>
              {renderIcon(item.type)}
            </View>
            <Text style={styles.message}>{item.message}</Text>

            {item.type === "Avaliação" && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleReview(item.id)}
              >
                <Text style={styles.buttonText}>Avaliar</Text>
              </TouchableOpacity>
            )}
            <View style={styles.date}>
              <Text style={styles.textDate}>{item.date}</Text>
            </View>
          </View>
        )}
      />

      <CustomerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    width: "100%",
  },
  card: {
    borderBottomWidth: 2,
    borderBottomColor: colors.light_gray,
    marginBottom: 5,
    gap: 15,
    paddingHorizontal: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
    gap: 5,
  },
  professionName: {
    fontSize: 18,
    fontWeight: "600",
  },
  message: {
    marginTop: 5,
  },
  date: {
    alignItems: "flex-end",
  },
  textDate: {
    marginVertical: 5,
    color: colors.gray,
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "30%",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});