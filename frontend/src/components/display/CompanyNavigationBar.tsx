import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays, faPenToSquare,  faCircleExclamation, faFile } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useNavigation } from "@react-navigation/native";
import { CompanyNavigationProp } from "@/src/types/CompanyStackType";
import { colors } from "@/src/styles/theme";

export const CompanyNavigationBar: React.FC = () => {
    const navigation = useNavigation<CompanyNavigationProp>();

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Company Scheduling")}
            >
                <FontAwesomeIcon 
                    icon={faCalendarDays as IconProp} 
                    style={styles.icon} 
                    size={22}
                />
                <Text style={styles.text}>Agendamentos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Edit Schedule")}
            >
                <FontAwesomeIcon 
                    icon={faPenToSquare as IconProp} 
                    style={styles.icon} 
                    size={22} 
                />
                <Text style={styles.text}>Editar Agenda</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Company Notifications")}
            >
                <FontAwesomeIcon 
                    icon={faCircleExclamation as IconProp} 
                    style={styles.icon} 
                    size={22}
                />
                <Text style={styles.text}>Notificações</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate("Reports")}
            >
                <FontAwesomeIcon 
                    icon={faFile as IconProp} 
                    style={styles.icon} 
                    size={22} 
                />
                <Text style={styles.text}>Relatórios</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.light_gray,
        padding: "5%"
    },
    button: {
        alignItems: "center"
    },
    icon: {
        color: colors.blue
    },
    text: {
        fontSize: 10,
        fontWeight: 600
    }
});