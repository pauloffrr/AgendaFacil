import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faCircleExclamation, faCalendarDays, faStar } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useNavigation } from "@react-navigation/native";
import { CustomerNavigationProp } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";

export const CustomerNavigationBar: React.FC = () => {
    const navigation = useNavigation<CustomerNavigationProp>();

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate("Customer Home")}
            >
                <FontAwesomeIcon 
                    icon={faHome as IconProp} 
                    style={styles.icon} 
                    size={22}
                />
                <Text style={styles.text}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate("Customer Notifications")}
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
            >
                <FontAwesomeIcon 
                    icon={faStar as IconProp} 
                    style={styles.icon} 
                    size={22} 
                />
                <Text style={styles.text}>Favoritos</Text>
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