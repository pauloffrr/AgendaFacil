import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { CustomerNavigationBar } from "../../components/display/CustomerNavigationBar";
import { BackButton } from "../../components/buttons/BackButton";
import { Logo } from "../../components/display/Logo";
import { UserIcon } from "../../components/buttons/UserIcon";
import { ProfessionalMock } from "../../data/ProfessionalsMock";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { CustomerReviews } from "../../components/display/CustomerReviews";
import { AverageRating } from "../../components/display/AverageRating";
import { ReviewsCustomerMock } from "../../data/ReviewsCustomerMock";
import { ProfessionalProfileProps } from "@/src/types/CustomerStackType";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const [iconStarColor, setIconStarColor] = useState("#CCC");

  const toggleStarColor = () => {
    setIconStarColor((prevColor) =>
      prevColor === "#f1c40f" ? "#CCC" : "#f1c40f"
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
            navigation.navigate("Professionals Available", { id: id })
          }
        />

        <View style={styles.header}>
          <Logo />
          <UserIcon onPress={handleProfile}/>
        </View>

        {ProfessionalMock
          .filter((professional) => professional.id === id)
          .map((filteredProfessional) => (
            <View key={filteredProfessional.id}>
              <Image source={filteredProfessional.img} style={styles.img} />
              <Text style={styles.name}>{filteredProfessional.name}</Text>
              <Text style={styles.cnpj}>{filteredProfessional.cnpj}</Text>

              <View style={styles.address}>
                <FontAwesomeIcon
                  icon={faLocationDot as IconProp}
                  size={33}
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.textAddress}>
                    {filteredProfessional.cidade} -{" "}
                    {filteredProfessional.estado}
                  </Text>
                  <Text style={styles.textAddress}>
                    {filteredProfessional.rua}, N° {filteredProfessional.numero}
                  </Text>
                </View>
              </View>

              <Text style={styles.rayKm}>
                • Atende em até {filteredProfessional.raioKm}km
              </Text>
              <View style={styles.favorites}>
                <TouchableOpacity onPress={toggleStarColor}>
                  <FontAwesomeIcon
                    icon={faStar as IconProp}
                    size={28}
                    color={iconStarColor}
                  />
                </TouchableOpacity>
                <Text>Adicionar aos Favoritos</Text>
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
          ))}
      </ScrollView>

      <CustomerNavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  img: {
    width: 230,
    height: 170,
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 30,
  },
  name: {
    fontWeight: "700",
    fontSize: 20,
    marginTop: 10,
  },
  cnpj: {
    fontWeight: "400",
    fontSize: 14,
    marginTop: 3,
    color: "#858585ff",
  },
  address: {
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    color: "#007BFF",
  },
  textAddress: {
    fontSize: 13,
    fontWeight: "400",
    color: "#858585ff",
  },
  rayKm: {
    marginTop: 25,
    fontSize: 15,
    fontWeight: "500",
  },
  favorites: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
  buttonWpp: {
    marginTop: 30,
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "70%",
  },
  iconWpp: {
    color: "#fff",
  },
  textWpp: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
