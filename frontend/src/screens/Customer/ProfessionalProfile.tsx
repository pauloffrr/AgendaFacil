import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
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

export const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({ navigation, route }) => {
  const { professionalId, professionId, professionName } = route.params;
  const [iconStarColor, setIconStarColor] = useState(colors.light_gray);
  const professional = ProfessionalMock.find(p => p.id === professionalId);

  if (!professional) {
    return (
      <View style={styles.screen}>
        <Text>Profissional não encontrado.</Text>
      </View>
    );
  };

  const toggleStarColor = () => {
    setIconStarColor((prevColor) =>
      prevColor === colors.yellow ? colors.light_gray : colors.yellow
    );
  };

  const handleProfile = () => {
    console.log("Perfil");
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <BackButton
          onPress={() =>
            navigation.navigate("Professionals Available", { id: professionId, name: professionName })
          }
        />

        <View style={styles.header}>
          <Logo />
          <UserIcon onPress={handleProfile}/>
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
            <TouchableOpacity onPress={toggleStarColor}>
              <FontAwesomeIcon
                icon={faStar as IconProp}
                size={28}
                color={iconStarColor}
              />
            </TouchableOpacity>
            <Text style={styles.textFavorites}>Adicionar aos Favoritos</Text>
          </View>

          <TouchableOpacity style={styles.buttonWpp}>
            <FontAwesomeIcon
              icon={faWhatsapp as IconProp}
              size={38}
              style={styles.iconWpp}
            />
            <Text style={styles.textWpp}>Entre em Contato</Text>
          </TouchableOpacity>

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
  buttonWpp: {
    marginTop: "10%",
    backgroundColor: colors.green,
    padding: "5%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5%",
    width: "70%",
  },
  iconWpp: {
    color: colors.white,
  },
  textWpp: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  }
});