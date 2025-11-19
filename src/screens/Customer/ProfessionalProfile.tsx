import { BackButton } from "@/src/components/buttons/BackButton";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { AverageRating } from "@/src/components/display/AverageRating";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { Logo } from "@/src/components/display/Logo";
import { CompanyReviews } from "@/src/components/display/Reviews";
import { useFavorites } from "@/src/context/FavoritesContext";
import { apiNotifications, apiUsers } from "@/src/services/Api";
import { colors } from "@/src/styles/theme";
import { ApiError } from "@/src/types/ApiErrorType";
import { ProfessionalProfileProps } from "@/src/types/CustomerStackType";
import { Professional } from "@/src/types/ProfessionalType";
import { Reviews } from "@/src/types/ReviewsType";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { API_URL_NOTIFICATIONS, API_URL_USERS } from "@env";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "@/src/context/UserContext";

export const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({ navigation, route }) => {
  const { professionalId, professionName, date, startTime } = route.params;
  const { toggleFavorite, isFavorite } = useFavorites();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");
  const { user } = useUser()

  const getProfessionalProfile = async () => {
    try {
      const response = await apiUsers.get(`${API_URL_USERS}/company/${professionalId}`);

      setProfessional(response.data);
      setErrorMessage("");

    } catch (error: unknown) {
      let errorMsg = "Erro ao abrir perfil do profissional. Tente novamente!";

      if (typeof error === 'object' && error !== null) {
        errorMsg = getErrorMessage(error as ApiError);
      } else if (typeof error === 'string') {
        errorMsg = error;
      }

      setErrorMessage(errorMsg);
    }
  }

  useEffect(() => {
    getProfessionalProfile();
  }, []);

  useEffect(() => {
    if (professional && professional.idCompany) {
      getReviews();
    }
  }, [professional]);

  const getReviews = async () => {
    try {
      const response = await apiUsers.get(`${API_URL_USERS}/reviews/company/${professional?.idCompany}`);

      setReviews(response.data);
      setErrorMessage("");

    } catch (error: unknown) {
      let errorMsg = "Erro ao exibir avaliações. Tente novamente!";
      
      if (typeof error === 'object' && error !== null) {
        errorMsg = getErrorMessage(error as ApiError);
      } else if (typeof error === 'string') {
        errorMsg = error;
      }

      setErrorMessage(errorMsg);
    }
  };

  if (!professional) {
    return (
      <View style={styles.screen}>
        <Text>Profissional não encontrado.</Text>
      </View>
    );
  };

  const favorite = isFavorite(professional.idCompany);

  const submitForm = async() => {
    if(!date && !startTime) {
      setErrorMessage("Todos os campos são obrigatórios")

      setTimeout(() => {
        setErrorMessage("")
      }, 1500)
    }

    try {
      const payloadCompany = {
        companyId: professionalId,
        customerId: user?.idUser,
        type: 'Pendente',
        text: `${user?.name} gostaria de um agendamento para o dia ${date} às ${startTime}`,
        street: user?.street,
        number: user?.number,
        date: new Date()
      }

      await apiNotifications.post(`${API_URL_NOTIFICATIONS}/notifications-company`, payloadCompany);

      const payloadCustomer = {
        customerId: user?.idUser,
        companyId: professionalId,
        type: "Pendente",
        text: `A empresa tem até 24 horas para confirmar ou cancelar a sua solicitação de agendamento.`,
        profession: professionName,
        date: new Date()
      };

      await apiNotifications.post(`${API_URL_NOTIFICATIONS}/notifications-customer`, payloadCustomer);

      setSucessMessage("Solicitação de agendamento enviada! Acompanhe no menu de notificações.")
      setTimeout(() => {
        setSucessMessage("")
      }, 1500)

      setTimeout(() => {
        navigation.navigate("Customer Notifications")
      }, 2000)
      
    } catch (error) {
      setErrorMessage("Erro ao realizar o cadastro do Horário " + error)
      setTimeout(() => {
        setErrorMessage("")
      }, 1500)
    }
  }

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <BackButton />

        <View style={styles.header}>
          <Logo />
          <UserIcon />
        </View>
        
        <View key={professional.idCompany}>
          <Image source={require("../../assets/profissional.webp")} style={styles.img} />
          <Text style={styles.name}>{professional.name}</Text>
          <Text style={styles.cnpj}>{professional.cnpj}</Text>

          <View style={styles.address}>
            <FontAwesomeIcon
              icon={faLocationDot as IconProp}
              size={33}
              style={styles.icon}
            />
            <View>
              <Text style={styles.textAddress}>
                {professional.city} -{" "}
                {professional.state}
              </Text>
              <Text style={styles.textAddress}>
                {professional.street}, N° {professional.number}
              </Text>
            </View>
          </View>

          <Text style={styles.rayKm}>
            • Atende em até {professional.rayKm}km
          </Text>
          <View style={styles.favorites}>
            <TouchableOpacity onPress={() => toggleFavorite(professional)}>
              <FontAwesomeIcon
                icon={faStar as IconProp}
                size={28}
                color={favorite ? colors.yellow : colors.light_gray}
              />
            </TouchableOpacity>
            <Text style={styles.textFavorites}>Adicionar aos Favoritos</Text>
          </View>

          <TouchableOpacity style={styles.buttonSchedule} onPress={submitForm}>
            <FontAwesomeIcon
              icon={faCalendarDays as IconProp}
              size={38}
              style={styles.iconSchedule}
            />
            <Text style={styles.textSchedule}>Agendar Horário</Text>
          </TouchableOpacity>

          {
            errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : 
            sucessMessage ? <Text style={styles.sucessMessage}>{sucessMessage}</Text> : 
            null
          }

          <CompanyReviews companyId={professional.idCompany} />
          <AverageRating reviews={reviews} style={styles.averageRating}/>
        </View>
      </ScrollView>

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
  img: {
    width: "85%",
    height: "10%",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: "10%",
  },
  name: {
    fontWeight: "700",
    fontSize: 25,
    marginTop: "5%",
  },
  cnpj: {
    fontWeight: "400",
    fontSize: 18,
    marginTop: "1%",
    color: colors.gray,
  },
  address: {
    marginTop: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "3%",
  },
  icon: {
    color: colors.blue,
  },
  textAddress: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.gray,
  },
  rayKm: {
    marginTop: "10%",
    fontSize: 18,
    fontWeight: "500",
  },
  favorites: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2%",
    marginTop: "2%",
  },
  textFavorites: {
    fontSize: 18
  },
  buttonSchedule: {
    marginTop: "10%",
    backgroundColor: colors.blue,
    padding: "5%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5%",
    width: "70%",
  },
  iconSchedule: {
    color: colors.white,
  },
  textSchedule: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  sucessMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.green,
    fontWeight: "bold"
  },
  errorMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.red,
    fontWeight: "bold"
  },
  averageRating: {
    marginBottom: "70%"
  }
});