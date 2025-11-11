import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { CardProfessional } from "@/src/components/display/CardProfessional";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { ProfessionalsAvailableProps } from "@/src/types/CustomerStackType";
import { Professional } from "@/src/types/ProfessionalType";
import { colors } from "@/src/styles/theme";
import api from "@/src/services/Api";
import { API_URL } from "@env";
import { useUser } from "@/src/context/UserContext";
import { ApiError } from "@/src/types/ApiErrorType";
import { getErrorMessage } from "@/src/utils/errorHandler";

export const ProfessionalsAvailable: React.FC<ProfessionalsAvailableProps> = ({ navigation, route }) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const { nameCategory, idProfession, nameProfession, date, startTime } = route.params;
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();

  const getProfessionalsAvailable = async () => {
    if (!user?.state || !user?.city) return;

    try {
      const response = await api.get(`${API_URL}/company/${user.state}/${user.city}/${nameCategory}/${nameProfession}/${date}/${startTime}`);
      
      setProfessionals(response.data);
      setErrorMessage("");

    } catch (error: unknown) {
      let errorMsg = "Erro ao buscar profissionais disponíveis. Tente novamente!";

      if (typeof error === 'object' && error !== null) {
        errorMsg = getErrorMessage(error as ApiError);
      } else if (typeof error === 'string') {
        errorMsg = error;
      }

      setErrorMessage(errorMsg);
    }
  }

  useEffect(() => {
    getProfessionalsAvailable();
  }, []);

  const filteredProfessionals = professionals;


  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <BackButton />

        <View style={styles.header}>
          <Logo />
          <UserIcon />
        </View>

        {filteredProfessionals.length > 0 ? (
          <>
            <Text style={styles.title}>
              {nameProfession}(s) disponíveis na data desejada
            </Text>

            <FlatList
              data={professionals}
              keyExtractor={(item) => item.idCompany.toString()}
              renderItem={({ item }) => (
                <CardProfessional
                  professional={item}
                  onPress={() =>
                    navigation.navigate("Professional Profile", {
                      professionalId: item.idCompany,
                      professionId: idProfession,
                      professionName: nameProfession,
                      date: date,
                      startTime: startTime
                    })
                  }
                />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
            </Text>
          </View>
        )}
      </View>

      <CustomerNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: "5%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: "10%",
    marginTop: "20%",
  },
  card: {
    borderColor: colors.light_gray,
    borderStyle: "solid",
    borderWidth: 2,
    height: "130%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
  },
  img: {
    width: "120%",
    height: "126%",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: colors.gray,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.red,
    fontWeight: "bold"
  }
});