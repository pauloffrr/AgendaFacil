import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CardProfessionalProps } from "@/src/types/CardProfessionalType";
import { colors } from "@/src/styles/theme";

export const CardProfessional: React.FC<CardProfessionalProps> = ({ professional, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} key={professional.id} >
      <Image style={styles.img} source={professional.img} />

      <View style={styles.info}>
        <Text style={styles.name}>{professional.name}</Text>
        <View style={styles.desc}>
          <View style={styles.spacing}>
            <FontAwesomeIcon
              icon={faStar as IconProp}
              size={13}
              style={styles.icon}
            />
            <Text style={styles.assessment}>{professional.mediaAvaliacao}</Text>
          </View>

          <View style={styles.spacing}>
            <Text style={styles.priceText}>Preço médio</Text>
            <Text style={styles.averagePrice}>
              R$ {professional.precoMedio.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: colors.light_gray,
    borderWidth: 2,
    height: 130,
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 30,
  },
  img: {
    width: 120,
    height: 126,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  info: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  name: {
    fontWeight: "500",
    fontSize: 15,
    marginTop: 20,
  },
  desc: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 10,
    gap: 6,
  },
  spacing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  icon: {
    color: colors.yellow,
  },
  assessment: {
    fontSize: 15,
  },
  priceText: {
    fontSize: 13,
  },
  averagePrice: {
    fontWeight: "600",
    fontSize: 13,
    color: colors.blue,
  }
});