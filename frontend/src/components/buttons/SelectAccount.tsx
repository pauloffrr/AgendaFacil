import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList, NavigationProps } from "@/src/types/SelectAccountType";
import { colors } from "@/src/styles/theme";

type SelectAccountRouteProp = RouteProp<
    RootStackParamList,
    "Customer Registration Data" | "Company Registration Data"
>;

export const SelectAccount: React.FC = () => {
    const route = useRoute<SelectAccountRouteProp>();
    const navigation = useNavigation<NavigationProps>();
    const selected = route.name === "Customer Registration Data" ? "Cliente" : "Empresa"

    return ( 
        <View style={styles.container}>
            <TouchableOpacity 
                style={[selected === "Cliente" ? styles.activeButton : styles.inactiveButton, styles.leftButton]}
                onPress={() => navigation.navigate("Customer Registration Data")}
            >
                <Text style={selected === "Cliente" ? styles.activeText : styles.inactiveText}>
                    Cliente
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[selected === "Empresa" ? styles.activeButton : styles.inactiveButton, styles.rightButton]}
                onPress={() => navigation.navigate("Company Registration Data")}
            >
                <Text style={selected === "Empresa" ? styles.activeText : styles.inactiveText}>
                    Empresa
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20
    }, 

    activeButton: {
        backgroundColor: colors.blue,
        padding: 12,
    },

    activeText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 18
    },

    inactiveButton: {
        backgroundColor: colors.light_gray,
        padding: 12,
    },

    inactiveText: {
        fontWeight: "bold",
        fontSize: 18 
    },

    leftButton: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },

    rightButton: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    }
});