import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faStar, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { CustomerReviews } from "@/src/components/display/CustomerReviews";
import { AverageRating } from "@/src/components/display/AverageRating";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { ProfessionalMock } from "@/src/data/ProfessionalsMock";
import { ReviewsCustomerMock } from "@/src/data/ReviewsCustomerMock";
import { ProfessionalProfileProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";
import { useFavorites } from "@/src/context/FavoritesContext";
import axios from "axios";

export const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({ navigation, route }) => {
  const { professionalId, date, startTime } = route.params;
  const professional = ProfessionalMock.find(p => p.id === professionalId);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");

  if (!professional) {
    return (
      <View style={styles.screen}>
        <Text>Profissional não encontrado.</Text>
      </View>
    );
  };

  const favorite = isFavorite(professional.id);

  const submitForm = async() => {
    if(!date && !startTime) {
      setErrorMessage("Todos os campos são obrigatórios")

      setTimeout(() => {
        setErrorMessage("")
      }, 1500)
    }

    try {
      const data = {
        date: date,
        startTime: startTime
      }

      await axios.post("http://localhost:3000/api/scheduling", data, {
        headers: { "Content-Type": "application/json" }
      })

      setSucessMessage("Horário agendado com sucesso!")
      setTimeout(() => {
        setErrorMessage("")
        setSucessMessage("")
      }, 1500)

      setTimeout(() => {
        navigation.navigate("Customer Home")
      }, 2000)
      
    } catch (error) {
      console.error("Erro ao realizar o cadastro do Horário", error)
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
        
        <View key={professional.id}>
          <Image source={professional.img} style={styles.img} />
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
                {professional.cidade} -{" "}
                {professional.estado}
              </Text>
              <Text style={styles.textAddress}>
                {professional.rua}, N° {professional.numero}
              </Text>
            </View>
          </View>

          <Text style={styles.rayKm}>
            • Atende em até {professional.raioKm}km
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

          <CustomerReviews />
          <AverageRating reviews={ReviewsCustomerMock} />
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
  }
});