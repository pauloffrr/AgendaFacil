import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { professionalMock, Professional } from "../../data/professionalMock";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface CardProfessionalProps {
  navigation: NativeStackNavigationProp<any, any>;
}

export const CardProfessional: React.FC<CardProfessionalProps> = ({ navigation }) => {
  const renderItem: ListRenderItem<Professional> = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Professional Profile", { id: item.id })
      }
    >
      <Image style={styles.img} source={item.img} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.desc}>
          <View style={styles.spacing}>
            <FontAwesomeIcon icon={faStar as IconProp} size={13} style={styles.icon} />
            <Text style={styles.assessment}>{item.mediaAvaliacao}</Text>
          </View>

          <View style={styles.spacing}>
            <Text style={styles.priceText}>Preço médio</Text>
            <Text style={styles.averagePrice}>
              R$ {item.precoMedio.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={professionalMock}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: "#dfdedeff",
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
    fontSize: 13,
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
    color: "#f1c40f",
  },
  assessment: {
    fontSize: 12,
  },
  priceText: {
    fontSize: 12,
  },
  averagePrice: {
    fontWeight: "600",
    fontSize: 12,
    color: "#007BFF",
  },
});