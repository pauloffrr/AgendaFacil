import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { useFavorites } from "@/src/context/FavoritesContext";
import { CardProfessional } from "@/src/components/display/CardProfessional";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { FavoritesProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";

export const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
    const { favorites } = useFavorites();

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Logo />
                    <UserIcon />
                </View>

                <Text style={styles.title}>Favoritos</Text>

                {favorites.length > 0 ? (
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                        <CardProfessional
                            professional={item}
                            onPress={() =>
                                navigation.navigate("Professional Profile", {
                                professionalId: item.id,
                                professionId: item.id,
                                professionName: item.name,
                            })}
                        />
                        )}
                    />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Nenhum favorito ainda.</Text>
                        </View>
                    )
                }
            </View>
            
            <CustomerNavigationBar />
        </View>
    );
};

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
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyText: {
        fontSize: 18,
        color: colors.gray,
        textAlign: "center"
    }
})