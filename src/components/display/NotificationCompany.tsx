import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarCheck, faCalendarXmark, faBell, faCircleQuestion, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
    const { user } = useUser();
    const endTimeRef = useRef<Date | null>(null);

    const showTimePicker = () => setTimePickerVisibility(true);
    const hideTimePicker = () => setTimePickerVisibility(false);

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
    
    const formatDateNotification = (isoString: string) => {
        const onlyDate = isoString.split("T")[0];
        const [year, month, day] = onlyDate.split("-");

        return `${day}/${month}/${year}`;
    };

    const formatEndTime = (date: Date | null) => {
        if (!date) return "";
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const handleConfirmTime = (selectedTime: Date) => {
        const now = new Date();

        if (endTime) {
            const combined = new Date(endTime);
            combined.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);

            if (combined < now) {
                alert("Você não pode selecionar um horário anterior ao atual.");
                hideTimePicker();
                return;
            }
        }

        setEndTime(selectedTime);
        endTimeRef.current = selectedTime;
        hideTimePicker();

        setModalConfig(prev => prev ? {
            ...prev,
            timeValue: selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        } : prev);
    };

    const confirmNotification = async (notification: Notification) => {
        if (!notification) {
            alert("Falha ao processar a notificação. Tente novamente.");
            setModalConfig(null);
            return;
        }

        const finalEndTime = endTime || endTimeRef.current;
        if (!finalEndTime) {
            alert("Por favor, selecione o Horário Final antes de confirmar.");
            return;
        }
        
        const customer = notification.customer;
        const company = notification.company;
        const textTime = formatEndTime(finalEndTime);
    
        if (!customer?.idCustomer || !user?.idUser) {
            alert("Dados de usuário ou cliente incompletos.");
            setModalConfig(null);
            return;
        }

        try {
            const payloadSchedulingCustomer = {
                companyId: user?.idUser,
                customerId: customer?.idCustomer,
                title: `${company?.name} - ${company?.street}, N° ${company?.number}`,
                startDate: notification.schedulingDate,
                endDate: notification.schedulingDate,
                startHour: notification.schedulingStartTime,
                endHour: textTime
            }
            const schedulingCustomerResponse = await apiScheduling.post(
                `${API_URL_SCHEDULING}/scheduling-customer`, payloadSchedulingCustomer
            );
            const idSchedulingCustomer = schedulingCustomerResponse.data.idSchedulingCustomer;

            const payloadSchedulingCompany = {
                companyId: user?.idUser,
                customerId: customer?.idCustomer,
                schedulingCustomerId: idSchedulingCustomer,
                title: `${customer?.name} - ${customer?.street}, N° ${customer?.number}`,
                startDate: notification.schedulingDate,
                endDate: notification.schedulingDate,
                startHour: notification.schedulingStartTime,
                endHour: textTime
            }
            const schedulingCompanyResponse = await apiScheduling.post(
                `${API_URL_SCHEDULING}/scheduling-company`, payloadSchedulingCompany
            );
            const idSchedulingCompany = schedulingCompanyResponse.data.idSchedulingCompany;

            const payloadNotificationCompany = {
                type: 'Confirmado',
                text: `Você confirmou o atendimento com ${customer?.name} no dia ${formatDateNotification(notification.schedulingDate)} às ${notification.schedulingStartTime} até ${textTime}.`,
                street: customer?.street,
                number: customer?.number,
                schedulingCompanyId: idSchedulingCompany,
                schedulingDate: notification.schedulingDate,
                schedulingStartTime: notification.schedulingStartTime,
                schedulingEndTime: textTime,
                date: new Date()
            };
            await apiNotifications.put(
                `${API_URL_NOTIFICATIONS}/notifications-company/${notification.idNotificationCompany}`,
                payloadNotificationCompany
            );

            const payloadNotificationCustomer = {
                customerId: customer?.idCustomer,
                companyId: user?.idUser,
                type: 'Confirmado',
                text: `${company?.name} confirmou seu agendamento para o dia ${formatDateNotification(notification.schedulingDate)} às ${notification.schedulingStartTime} até ${textTime}.`,
                profession: company?.profession,
                schedulingDate: notification.schedulingDate,
                schedulingStartTime: notification.schedulingStartTime,
                schedulingEndTime: textTime,
                date: new Date()
            }
            await apiNotifications.post(`${API_URL_NOTIFICATIONS}/notifications-customer/`, payloadNotificationCustomer);

            setModalConfig(null);
            setCurrentNotification(null);
            await getNotificationsCompany();

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

    const cancelNotification = async (notification: Notification) => {
        try {
            const customer = notification.customer;
            const company = notification.company;

            const payloadCompany = {
                type: 'Cancelado',
                text: `Você cancelou o atendimento com ${customer?.name} no dia ${formatDateNotification(notification.schedulingDate)} às ${notification.schedulingStartTime}.`,
                street: customer?.street,
                number: customer?.number,
                schedulingDate: notification.schedulingDate,
                schedulingStartTime: notification.schedulingStartTime,
                date: new Date()
            };
            await apiNotifications.put(
                `${API_URL_NOTIFICATIONS}/notifications-company/${notification.idNotificationCompany}`,
                payloadCompany
            );

            const payloadCustomer = {
                customerId: customer?.idCustomer,
                companyId: user?.idUser,
                type: 'Cancelado',
                text: `${company?.name} cancelou seu agendamento para o dia ${formatDateNotification(notification.schedulingDate)} às ${notification.schedulingStartTime}.`,
                profession: company?.profession,
                date: new Date()
            }
            await apiNotifications.post(`${API_URL_NOTIFICATIONS}/notifications-customer`, payloadCustomer);

            setModalConfig(null);
            await getNotificationsCompany();

        } catch (error) {
            let errorMsg = "Erro ao cancelar o agendamento. Tente novamente!";
                            
            if (typeof error === 'object' && error !== null) {
                errorMsg = getErrorMessage(error as ApiError);
            } else if (typeof error === 'string') {
                errorMsg = error;
            }

            setErrorMessage(errorMsg);
        }
    };

    const finalizeScheduling = async (notification: Notification) => {
        const customer = notification.customer;
        const company = notification.company;

        try {
            const payloadCompany = {
                type: 'Concluído',
                text: `Você finzalizou o atendimento com ${customer?.name} no dia ${formatDateNotification(notification.schedulingDate)} das ${notification.schedulingStartTime} até ${notification.schedulingEndTime}.`,
                date: new Date()
            };
            await apiNotifications.put(
                `${API_URL_NOTIFICATIONS}/notifications-company/${notification.idNotificationCompany}`,
                payloadCompany
            );

            const payloadCustomer = {
                customerId: customer?.idCustomer,
                companyId: user?.idUser,
                type: 'Avaliação',
                text: `${company?.name} finzalizou o seu agendamento para o dia ${formatDateNotification(notification.schedulingDate)} das ${notification.schedulingStartTime} até ${notification.schedulingEndTime}. Deseja Avaliar?`,
                profession: company?.profession,
                date: new Date()
            }
            await apiNotifications.post(`${API_URL_NOTIFICATIONS}/notifications-customer`, payloadCustomer);
            
            setModalConfig(null);
            await getNotificationsCompany();

        } catch (error) {
            let errorMsg = "Erro ao concluir o agendamento. Tente novamente!";
            
            if (typeof error === 'object' && error !== null) {
                errorMsg = getErrorMessage(error as ApiError); 
            } else if (typeof error === 'string') {
                errorMsg = error;
            }

            setErrorMessage(errorMsg);
        }
    }

    const extendScheduling = async (notification: Notification) => {
        if (!notification) {
            alert("Falha ao processar a notificação. Tente novamente.");
            setModalConfig(null);
            return;
        }
        
        const finalEndTime = endTime || endTimeRef.current;
        if (!finalEndTime) {
            alert("Por favor, selecione o Horário Final antes de confirmar.");
            return;
        }
        
        const customer = notification.customer;
        const company = notification.company;
        const scheduling = notification.scheduling;
        const textTime = formatEndTime(finalEndTime);

        try {
            await apiScheduling.put(
                `${API_URL_SCHEDULING}/scheduling-company/${notification.schedulingCompanyId}`,
                { endHour: textTime, notificationSent: false }
            );
            await apiScheduling.put(
                `${API_URL_SCHEDULING}/scheduling-customer/${scheduling?.schedulingCustomerId}`,
                { endHour: textTime }
            );
            
            const payloadNotificationCustomer = {
                customerId: customer?.idCustomer,
                companyId: user?.idUser,
                type: 'Lembrete',
                text: `${company?.name} estendeu o horário do seu agendamento até ás ${textTime}.`,
                profession: company?.profession,
                date: new Date()
            }
            await apiNotifications.post(`${API_URL_NOTIFICATIONS}/notifications-customer`, payloadNotificationCustomer);
            
            const payloadNotificationCompany = {
                type: 'Lembrete',
                text: `Você estendeu o horário do agendamento com ${customer?.name} até ás ${textTime}`,
                schedulingCompanyId: notification.schedulingCompanyId,
                schedulingEndTime: textTime,
                date: new Date()
            }
            await apiNotifications.put(
                `${API_URL_NOTIFICATIONS}/notifications-company/${notification.idNotificationCompany}`,
                payloadNotificationCompany
            );

            setModalConfig(null);
            await getNotificationsCompany();

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

    const openConfirmModal = (notification: Notification) => {
        setEndTime(null);

        setModalConfig({
            text: "Tem certeza que deseja confirmar este serviço?",
            showTimeInput: true,
            timeValue: "",
            onPressTime: showTimePicker,
            notificationContext: notification,
            buttonProps: {
                firstOnPress: () => confirmNotification(notification),
                secondOnPress: () => {
                    setModalConfig(null);
                    setCurrentNotification(null);
                },
                firstButtonText: "Confirmar",
                secondButtonText: "Voltar",
                firstButtonColor: colors.green,
                secondButtonColor: colors.light_gray,
                firstTextColor: colors.white,
                secondTextColor: colors.black
            },
            height: 330
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
            },
            height: 220
        });
    };

    const openFinalizeModal = (notification: Notification) => {
        setModalConfig({
            text: "Tem certeza que deseja concluir este serviço?",
            buttonProps: {
                firstOnPress: () => finalizeScheduling(notification),
                secondOnPress: () => setModalConfig(null),
                firstButtonText: "Concluir",
                secondButtonText: "Voltar",
                firstButtonColor: colors.blue,
                secondButtonColor: colors.light_gray,
                firstTextColor: colors.white,
                secondTextColor: colors.black
            },
            height: 220
        });
    };

    const openExtendModal = (notification: Notification) => {
        setEndTime(null);

        setModalConfig({
            text: "Para qual horário deseja estender o horário deste serviço?",
            showTimeInput: true,
            timeValue: "",
            onPressTime: showTimePicker,
            notificationContext: notification,
            buttonProps: {
                firstOnPress: () => extendScheduling(notification),
                secondOnPress: () => {
                    setModalConfig(null);
                    setCurrentNotification(null);
                },
                firstButtonText: "Confirmar",
                secondButtonText: "Voltar",
                firstButtonColor: colors.green,
                secondButtonColor: colors.light_gray,
                firstTextColor: colors.white,
                secondTextColor: colors.black
            },
            height: 330
        });
    };

    useEffect(() => {
        getNotificationsCompany();
    }, []);

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
        case "Avaliação":
            return (
                <FontAwesomeIcon 
                icon={faStar as IconProp}
                size={22}
                color={colors.yellow}
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

        <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
        />

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
                                firstOnPress={() => openFinalizeModal(item)}
                                secondOnPress={() => openExtendModal(item)}
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
            <ModalConfirm {...modalConfig} visible={!!modalConfig} />
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