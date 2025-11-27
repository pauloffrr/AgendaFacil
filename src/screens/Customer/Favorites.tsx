import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { CardProfessional } from "@/src/components/display/CardProfessional";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { FavoritesProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";
import { useUser } from "@/src/context/UserContext";
import { apiUsers } from "@/src/services/Api";
import { API_URL_USERS } from "@env";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { ApiError } from "@/src/types/ApiErrorType";
import { Professional } from "@/src/types/ProfessionalType";
import { FavoritesType } from "@/src/types/FavoritesType";

export const Favorites: React.FC<FavoritesProps> = ({ navigation }) => {
    const { user } = useUser();
    const [favorites, setFavorites] = useState<FavoritesType[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    const getFavorites = async () => {
        try {
            const response = await apiUsers.get(`${API_URL_USERS}/favorites/customer/${user?.idUser}`);

            setFavorites(response.data);
            setErrorMessage("");
        } catch (error) {
            let errorMsg = "Erro ao carregar favoritos. Tente novamente!";
    
            if (typeof error === 'object' && error !== null) {
              errorMsg = getErrorMessage(error as ApiError);
            } else if (typeof error === 'string') {
              errorMsg = error;
            }

            setErrorMessage(errorMsg);
        }
    }

    const handleCardPress = (professional: Professional) => {
        navigation.navigate("Professional Profile", {
            professionalId: professional.idCompany,
            professionalName: professional.name,
            professionName: professional.profession,
            date: undefined, 
            startTime: undefined,
        })
    }

    const filteredFavorites = favorites;

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Logo />
                    <UserIcon />
                </View>

                <Text style={styles.title}>Favoritos</Text>

                {filteredFavorites.length > 0 ? (
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item.company.idCompany.toString()}
                        renderItem={({ item }) => (
                        <CardProfessional
                            professional={item.company}
                            onPress={() => handleCardPress(item.company)}
                        />
                        )}
                    />
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Nenhum favorito ainda.</Text>
                        </View>
                    )
                }

                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
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
    },
    errorMessage: {
        fontSize: 18,
        marginTop: "3%",
        color: colors.red,
        fontWeight: "bold"
    }
})