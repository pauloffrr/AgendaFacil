import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { NotificationsCompanyMock } from "../../data/NotificationCompanyMock";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarCheck, faCalendarXmark, faBell, faCircleQuestion, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ModalConfirm } from "@/src/components/modals/ModalConfirm";
import { Notification } from "@/src/types/NotificationType";
import { colors } from "@/src/styles/theme";
import { DuoButtons } from "../buttons/DuoButtons";
import { ModalConfirmProps } from "@/src/types/ModalConfirmType";

export const NotificationCompany: React.FC = () => {
    const [modalConfig, setModalConfig] = useState<ModalConfirmProps | null>(null);

    const openConfirmModal = () => {
        setModalConfig({
            text: "Tem certeza que deseja confirmar este serviço?",
            buttonProps: {
                firstOnPress: () => setModalConfig(null),
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

     const openCancelModal = () => {
        setModalConfig({
            text: "Tem certeza que deseja cancelar este serviço?",
            buttonProps: {
                firstOnPress: () => setModalConfig(null),
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

    const renderIcon = (type: Notification["typeCompany"]) => {
        switch (type) {
        case "À Definir":
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

  return (
    <View style={styles.container}>
        <FlatList
            style={styles.list}
            data={NotificationsCompanyMock}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.typeCompany}>{item.typeCompany}</Text>
                        {renderIcon(item.typeCompany)}
                    </View>

                    <Text style={styles.message}>{item.message}</Text>

                    <View style={styles.address}>
                        <FontAwesomeIcon icon={faLocationDot as IconProp} size={16} color={colors.blue} />
                        <Text>{item.address}</Text>
                    </View>

                    {item.typeCompany === "À Definir" && (
                        <DuoButtons 
                            firstOnPress={openConfirmModal}
                            secondOnPress={openCancelModal}
                            firstButtonText="Confirmar" 
                            secondButtonText="Cancelar"
                            firstButtonColor={colors.green}
                            secondButtonColor={colors.red}
                            firstTextColor={colors.white}
                            secondTextColor={colors.white}
                        />
                    )}

                    {item.typeCompany === "Serviço Finalizado?" && (
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
                        <Text style={styles.textDate}>{item.date}</Text>
                    </View>
                </View>
            )}
        />

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
    }
});