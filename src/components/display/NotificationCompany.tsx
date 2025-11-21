import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarCheck, faCalendarXmark, faBell, faCircleQuestion, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ModalConfirm } from "@/src/components/modals/ModalConfirm";
import { Notification } from "@/src/types/NotificationType";
import { colors } from "@/src/styles/theme";
import { DuoButtons } from "../buttons/DuoButtons";
import { ModalConfirmProps } from "@/src/types/ModalConfirmType";
import { apiNotifications, apiScheduling } from "@/src/services/Api";
import { API_URL_NOTIFICATIONS, API_URL_SCHEDULING } from "@env";
import { useUser } from "@/src/context/UserContext";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { ApiError } from "@/src/types/ApiErrorType";

export const NotificationCompany: React.FC = () => {
    const [modalConfig, setModalConfig] = useState<ModalConfirmProps | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useUser();

    const getNotificationsCompany = async () => {
        try {
            const response = await apiNotifications.get(`${API_URL_NOTIFICATIONS}/notifications-company/company/${user?.idUser}`);

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
        getNotificationsCompany();
    }, []);

    const confirmNotification = async (notification: Notification) => {
        try {
            const customer = notification.customer;

            const payloadNotification = {
                type: 'Confirmado',
                text: `Você confirmou o atendimento com ${customer?.name} no dia ${notification.schedulingDate} às ${notification.schedulingStartTime} até ${notification.schedulingEndTime}`,
                street: customer?.street,
                number: customer?.number,
                schedulingDate: notification.schedulingDate,
                schedulingStartTime: notification.schedulingStartTime,
                schedulingEndTime: notification.schedulingEndTime,
                date: new Date()
            };

            await apiNotifications.put(
                `${API_URL_NOTIFICATIONS}/notifications-company/${notification.idNotificationCompany}`,
                payloadNotification
            );

            const payloadScheduling = {
                companyId: user?.idUser,
                customerId: customer?.idCustomer,
                title: `${customer?.name} - ${customer?.street}, N° ${customer?.number}`,
                startDate: notification.schedulingDate,
                endDate: notification.schedulingDate,
                startHour: notification.schedulingStartTime,
                endHour: notification.schedulingEndTime
            }

            await apiScheduling.post(`${API_URL_SCHEDULING}/scheduling-company`, payloadScheduling);
            await apiScheduling.post(`${API_URL_SCHEDULING}/scheduling-customer`, payloadScheduling);

            setModalConfig(null);
            await getNotificationsCompany();

        } catch (error) {
            setErrorMessage("Erro ao confirmar agendamento!");
            setModalConfig(null);
        }
    };

    const cancelNotification = async (notification: Notification) => {
        try {
            const customer = notification.customer;

            const payload = {
                type: 'Cancelado',
                text: `Você cancelou o atendimento com ${customer?.name} no dia ${notification.schedulingDate} às ${notification.schedulingStartTime}`,
                street: customer?.street,
                number: customer?.number,
                schedulingDate: notification.schedulingDate,
                schedulingStartTime: notification.schedulingStartTime,
                date: new Date()
            };

            await apiNotifications.put(
                `${API_URL_NOTIFICATIONS}/notifications-company/${notification.idNotificationCompany}`,
                payload
            );

            setModalConfig(null);
            await getNotificationsCompany();

        } catch (error) {
            setErrorMessage("Erro ao cancelar agendamento!");
            setModalConfig(null);
        }
    };

    const openConfirmModal = (notification: Notification) => {
        setModalConfig({
            text: "Tem certeza que deseja confirmar este serviço?",
            buttonProps: {
                firstOnPress: () => confirmNotification(notification),
                secondOnPress: () => setModalConfig(null),
                firstButtonText: "Confirmar",
                secondButtonText: "Voltar",
                firstButtonColor: colors.green,
                secondButtonColor: colors.light_gray,
                firstTextColor: colors.white,
                secondTextColor: colors.black
            }
        });
    };

     const openCancelModal = (notification: Notification) => {
        setModalConfig({
            text: "Tem certeza que deseja cancelar este serviço?",
            buttonProps: {
                firstOnPress: () => cancelNotification(notification),
                secondOnPress: () => setModalConfig(null),
                firstButtonText: "Cancelar",
                secondButtonText: "Voltar",
                firstButtonColor: colors.red,
                secondButtonColor: colors.light_gray,
                firstTextColor: colors.white,
                secondTextColor: colors.black
            }
        });
    };

    const openFinalizeModal = () => {
        setModalConfig({
        text: "Tem certeza que deseja concluir este serviço?",
            buttonProps: {
                firstOnPress: () => setModalConfig(null),
                secondOnPress: () => setModalConfig(null),
                firstButtonText: "Concluir",
                secondButtonText: "Voltar",
                firstButtonColor: colors.blue,
                secondButtonColor: colors.light_gray,
                firstTextColor: colors.white,
                secondTextColor: colors.black
            }
        });
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
        case "Confirmado":
            return (
                <FontAwesomeIcon
                    icon={faCalendarCheck as IconProp}
                    size={22}
                    color={colors.green}
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
        case "Serviço Finalizado?":
            return (
                <></>
            );
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
                keyExtractor={(item) => item.idNotificationCompany.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.typeCompany}>{item.type}</Text>
                            {renderIcon(item.type)}
                        </View>

                        <Text style={styles.message}>{item.text}</Text>

                        <View style={styles.address}>
                            <FontAwesomeIcon icon={faLocationDot as IconProp} size={16} color={colors.blue} />
                            <Text>{item.customer?.street}, N° {item.customer?.number}</Text>
                        </View>

                        {item.type === "Pendente" && (
                            <DuoButtons 
                                firstOnPress={() => openConfirmModal(item)}
                                secondOnPress={() => openCancelModal(item)}
                                firstButtonText="Confirmar" 
                                secondButtonText="Cancelar"
                                firstButtonColor={colors.green}
                                secondButtonColor={colors.red}
                                firstTextColor={colors.white}
                                secondTextColor={colors.white}
                            />
                        )}

                        {item.type === "Serviço Finalizado?" && (
                            <DuoButtons 
                                firstOnPress={openFinalizeModal}
                                firstButtonText="Concluir" 
                                secondButtonText="Estender"
                                firstButtonColor={colors.blue}
                                secondButtonColor={colors.light_gray}
                                firstTextColor={colors.white}
                                secondTextColor={colors.black}
                            />
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

        {modalConfig && (
            <ModalConfirm 
                visible={!!modalConfig}
                text={modalConfig.text}
                buttonProps={modalConfig.buttonProps}
            />
        )}

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        width: "100%"
    },
    card: {
        borderBottomWidth: 2,
        borderBottomColor: colors.light_gray,
        marginBottom: "2%",
        gap: 15,
        paddingHorizontal: "5%"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "10%",
        gap: "2%"
    },
    typeCompany: {
        fontSize: 20,
        fontWeight: "600"
    },
    address: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "3%",
        gap: "1%"
    },
    message: {
        marginTop: "3%"
    },
    date: {
        alignItems: "flex-end"
    },
    textDate: {
        marginVertical: "3%",
        color: colors.gray
    },
    button: {
        backgroundColor: colors.blue,
        paddingVertical: "3%",
        borderRadius: 8,
        width: "30%"
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        gap: "5%"
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