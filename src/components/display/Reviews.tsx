import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Reviews } from "@/src/types/ReviewsType";
import { colors } from "@/src/styles/theme";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { ApiError } from "@/src/types/ApiErrorType";
import { apiUsers } from "@/src/services/Api";
import { API_URL_USERS } from "@env";
import { ReviewsCompany } from "@/src/types/ReviewsCompanyType";

export const CompanyReviews: React.FC<ReviewsCompany> = ({ companyId }) => {
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getReviews = async () => {
    try {
      const response = await apiUsers.get(`${API_URL_USERS}/reviews/company/${companyId}`);

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
  }

  useEffect(() => {
    getReviews();
  }, []);

  const recentReviews: Reviews[] = [...reviews]
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
        keyExtractor={(item) => item.idReview.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.customer}>
              <Text style={styles.nameCustomer}>{item.customer.name}</Text>
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
              <Text style={styles.textDate}>{item.date.split("-").reverse().join("/")}</Text>
            </View>
          </View>
        )}
      />

      { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  reviews: {
    marginTop: "20%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2%",
  },
  iconStar: {
    color: colors.yellow,
  },
  textReviews: {
    fontSize: 23,
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
    marginBottom: "5%",
    marginTop: "5%",
  },
  customer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: "5%",
  },
  nameCustomer: {
    fontSize: 18,
    fontWeight: "700",
  },
  reviewsNote: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "5%",
  },
  textReview: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    color: colors.yellow,
  },
  description: {
    paddingHorizontal: "5%",
  },
  date: {
    padding: "5%",
    alignItems: "flex-end",
  },
  textDate: {
    fontSize: 13,
    color: colors.gray,
  },
  errorMessage: {
    fontSize: 18,
    marginTop: "3%",
    color: colors.red,
    fontWeight: "bold"
  }
});