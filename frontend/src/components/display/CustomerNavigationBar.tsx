import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faCircleExclamation, faCalendarDays, faStar } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerStackParamList } from "@/src/types/HomeTypes";

interface CustomerNavigationBarProps {
  navigation: NativeStackNavigationProp<CustomerStackParamList, "Customer Home">;
}

export const CustomerNavigationBar: React.FC<CustomerNavigationBarProps> = ({ navigation }) => {
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
        backgroundColor: "#CCC",
        padding: 20
    },
    button: {
        alignItems: "center"
    },
    icon: {
        color: "#007BFF"
    },
    text: {
        fontSize: 10,
        fontWeight: 600
    }
});