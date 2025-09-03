import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ReviewsCustomerMock } from "@/src/data/ReviewsCustomerMock";
import { ReviewsCustomer } from "@/src/types/ReviewsCustomerType";
import { colors } from "@/src/styles/theme";

export const CustomerReviews: React.FC = () => {
  const recentReviews: ReviewsCustomer[] = [...ReviewsCustomerMock]
    .sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-")).getTime();
      const dateB = new Date(b.date.split("/").reverse().join("-")).getTime();
      return dateB - dateA;
    })
    .slice(0, 3);

  return (
    <View>
      <View style={styles.reviews}>
        <FontAwesomeIcon
          icon={faStar as any}
          size={35}
          style={styles.iconStar}
        />
        <Text style={styles.textReviews}>Avaliações</Text>
      </View>

      <FlatList
        data={recentReviews}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.customer}>
              <Text style={styles.nameCustomer}>{item.name}</Text>
              <View style={styles.reviewsNote}>
                <Text style={styles.textReview}>{item.rating}</Text>
                <FontAwesomeIcon
                  icon={faStar as any}
                  size={15}
                  style={styles.icon}
                />
              </View>
            </View>

            <View style={styles.description}>
              <Text numberOfLines={2} ellipsizeMode="tail">
                {item.comment}
              </Text>
            </View>

            <View style={styles.date}>
              <Text style={styles.textDate}>{item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  reviews: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconStar: {
    color: colors.yellow,
  },
  textReviews: {
    fontSize: 20,
    fontWeight: "700",
  },
  card: {
    flex: 1,
    borderColor: colors.light_gray,
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
    padding: 15,
  },
  nameCustomer: {
    fontSize: 18,
    fontWeight: "700",
  },
  reviewsNote: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textReview: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    color: colors.yellow,
  },
  description: {
    paddingHorizontal: 15,
  },
  date: {
    padding: 15,
    alignItems: "flex-end",
  },
  textDate: {
    fontSize: 12,
    color: colors.gray,
  }
});