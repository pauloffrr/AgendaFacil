import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/styles/theme";

export const Logo: React.FC = () => {
    return (
        <View>
            <Text style={styles.title}>
                <Ionicons
                    name={"calendar"}
                    size={22}
                    color={colors.blue}
                /> AgendaFácil
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.blue,
        marginBottom: "5%",
        marginTop: "5%"
    }
});