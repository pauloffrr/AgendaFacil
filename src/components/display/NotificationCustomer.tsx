import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleQuestion, faCalendarCheck, faCalendarXmark, faBell } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CustomerReviewModal } from "@/src/components/modals/CustomerReviewModal";
import { Notification } from "@/src/types/NotificationType";
import { colors } from "@/src/styles/theme";
import { apiNotifications } from "@/src/services/Api";
import { useUser } from "@/src/context/UserContext";
import { API_URL_NOTIFICATIONS } from "@env";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { ApiError } from "@/src/types/ApiErrorType";

export const NotificationCustomer: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();

  const getNotificationsCustomer = async () => {
    try {
      const response = await apiNotifications.get(`${API_URL_NOTIFICATIONS}/notifications-customer/customer/${user?.idUser}`);

      setNotifications(response.data);
      setErrorMessage("");
      
    } catch (error) {
      let errorMsg = "Erro ao buscar notificações. Tente novamente!";
      
      if (typeof error === 'object' && error !== null) {
        errorMsg = getErrorMessage(error as ApiError);
      } else if (typeof error === 'string') {
        errorMsg = error;
      }

      setErrorMessage(errorMsg);
    }
  }

  useEffect(() => {
    getNotificationsCustomer();
  }, []);

  const handleReview = (id: number) => {
    setModalVisible(true);

    setNotifications((prev) =>
      prev.map((item) => {
        if (item.idNotificationCustomer === id && item.type === "Avaliação") {
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
      case "Pendente":
        return (
            <FontAwesomeIcon
                icon={faCircleQuestion as IconProp}
                size={22}
                color={colors.blue}
            />
        );
      case "Cancelado":
        return (
          <FontAwesomeIcon
            icon={faCalendarXmark as IconProp}
            size={22}
            color={colors.red}
          />
        );
      case "Confirmado":
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

  const filteredNotifications = notifications;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <View style={styles.container}>
      {filteredNotifications.length > 0 ? (
        <FlatList
          style={styles.list}
          data={notifications}
          keyExtractor={(item) => item.idNotificationCustomer.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.professionName}>{item.profession ?? item.company?.profession}</Text>
                {renderIcon(item.type)}
              </View>
              <Text style={styles.message}>{item.text}</Text>

              {item.type === "Avaliação" && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleReview(item.idNotificationCustomer)}
                >
                  <Text style={styles.buttonText}>Avaliar</Text>
                </TouchableOpacity>
              )}
              <View style={styles.date}>
                <Text style={styles.textDate}>{formatDate(item.date)}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            <Text style={styles.emptyMessage}>Nenhuma notificação disponível!</Text>
            { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
          </Text>
        </View>
      )}

      <CustomerReviewModal
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
    marginBottom: "2%",
    gap: 15,
    paddingHorizontal: "5%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
    gap: "2%",
  },
  professionName: {
    fontSize: 20,
    fontWeight: "600",
  },
  message: {
    marginTop: "3%",
  },
  date: {
    alignItems: "flex-end",
  },
  textDate: {
    marginVertical: "3%",
    color: colors.gray,
  },
  button: {
    backgroundColor: colors.blue,
    paddingVertical: "3%",
    borderRadius: 8,
    width: "30%",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: colors.gray,
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.gray,
    fontWeight: "bold"
  },
  errorMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.red,
    fontWeight: "bold"
  }
});
