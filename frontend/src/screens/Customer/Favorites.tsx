import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { colors } from "@/src/styles/theme";

export const Favorites: React.FC = () => {
    const handleProfile = () => {
        console.log("Perfil");
    };

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Logo />
                    <UserIcon onPress={handleProfile}/>
                </View>

                <Text style={styles.title}>Favoritos</Text>
            </View>
            
            <CustomerNavigationBar />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: "5%"
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "25%"
    },
    title: {
        fontWeight: "700",
        fontSize: 20,
        marginBottom: "10%",
        marginTop: "15%"
    }
})