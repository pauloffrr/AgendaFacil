import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { notificationsCustomerMock } from "../data/notificationsCustomerMock";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarCheck, faCalendarXmark, faBell } from "@fortawesome/free-solid-svg-icons";

export default function NotificationCustomer() {
    const getIconByType = (type) => {
        switch (type) {
            case "Cancelamento":
                return { icon: faCalendarXmark, color: "#FF0000" };
            case "Confirmação":
                return { icon: faCalendarCheck, color: "#25D366" };
            case "Avaliação":
            case "Concluído":
                return { icon: faCalendarCheck, color: "#007BFF" };
            case "Lembrete":
                return { icon: faBell, color: "#007BFF" };
            default:
                return { icon: null, color: "black" };
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={notificationsCustomerMock}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const { icon, color } = getIconByType(item.type);
                    return (
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <Text style={styles.professionName}>{item.professionName}</Text>
                                {icon && (
                                    <FontAwesomeIcon icon={icon} size={22} color={color} />
                                )}
                            </View>

                            <Text style={styles.message}>{ item.message }</Text>

                            <View style={styles.date}>
                                <Text style={styles.textDate}>{ item.date }</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        width: "100%",
        marginBottom: 0
    },
    card: {
        borderBottomWidth: 2,
        borderBottomColor: "#D9D9D9",
        marginBottom: 5,
        gap: 15,
        paddingHorizontal: 20
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "10%",
        gap: 5
    },
    professionName: {
        fontSize: 18,
        fontWeight: "600"
    },
    message: {
        marginTop: 5
    },
    date: {
        alignItems: "flex-end"
    },
    textDate: {
        marginVertical: 5,
        color: "#858585ff",
    }
})