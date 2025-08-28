import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { reviewsMock } from "../data/reviewsMock";

export default function CustomerReviews() {
    const recentReviews = [...reviewsMock]
    .sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateB - dateA;
    })
    .slice(0, 3);

    return (
        <FlatList
            data={recentReviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
            return (
                <View style={styles.card}>
                    <View style={styles.customer}>
                        <Text style={styles.nameCustomer}>{ item.name }</Text>
                        <View style={styles.reviews}>
                            <Text style={styles.textReview}>{ item.rating }</Text>
                            <FontAwesomeIcon icon={faStar} size={15} style={styles.icon} />
                        </View>
                    </View>

                    <View style={styles.description}>
                        <Text numberOfLines={2} ellipsizeMode="tail">{ item.comment }</Text>
                    </View>

                    <View style={styles.date}>
                        <Text style={styles.textDate}>{ item.date }</Text>
                    </View>
                </View>
            )
        }}/>
    );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderColor: "#dfdedeff",
    borderStyle: "solid",
    borderWidth: 2,
    height: "150%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    marginBottom: 5,
    marginTop: 20,
  },
  customer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: 15
  },
  nameCustomer: {
    fontSize: 18,
    fontWeight: "700"
  },
  reviews: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  textReview: {
    fontSize: 16,
    fontWeight: "600"
  },
  icon: {
    color: "#f1c40f",
  },
  description: {
    paddingHorizontal: 15
  },
  date: {
    padding: 15,
    alignItems: "flex-end"
  },
  textDate: {
    fontSize: 12,
    color: "#858585ff"
  }
});