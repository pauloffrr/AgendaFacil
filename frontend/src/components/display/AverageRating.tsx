import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import * as Progress from "react-native-progress";
import { CalculateReviews } from "@/src/types/CalculateReviewsType";
import { calculateAverage, countRatings } from "@/src/utils/CalculateReviewsAverage";
import { colors } from "@/src/styles/theme";

interface AverageRatingProps {
  reviews: CalculateReviews[];
};

export const AverageRating: React.FC<AverageRatingProps> = ({ reviews }) => {
  const totalReviews = reviews.length;
  const average = calculateAverage(reviews);
  const ratingCounts = countRatings(reviews);

  return (
    <View>
      <Text style={styles.textAverage}>Média de Avaliações</Text>

      <View style={styles.card}>
        <View style={styles.first}>
          <View style={styles.totalAverage}>
            <Text style={styles.number}>{average.toFixed(1)}</Text>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar as IconProp}
                  size={15}
                  style={styles.iconStar}
                />
              ))}
            </View>
          </View>

          <View style={styles.infoReviews}>
            <Text style={styles.textReview}>Média com base em</Text>
            <Text>{totalReviews} avaliações</Text>
          </View>
        </View>

        <View style={styles.second}>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[rating] || 0;
            const percentage = totalReviews ? count / totalReviews : 0;
            return (
              <View style={styles.rows} key={rating}>
                <Text>{rating}</Text>
                <FontAwesomeIcon
                  icon={faStar as IconProp}
                  size={15}
                  style={styles.iconStar}
                />
                <Progress.Bar
                  style={styles.progressBar}
                  progress={percentage}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textAverage: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 30,
  },
  card: {
    flex: 1,
    borderColor: colors.light_gray,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 40,
    marginTop: 10,
  },
  first: {
    flexDirection: "column",
    paddingHorizontal: 15,
  },
  totalAverage: {
    marginBottom: 20,
  },
  number: {
    fontSize: 44,
    fontWeight: "700",
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  iconStar: {
    color: colors.yellow,
  },
  infoReviews: {
    marginBottom: 10,
  },
  textReview: {
    color: colors.gray,
    fontSize: 14,
  },
  second: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
  },
  rows: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  progressBar: {
    width: 100,
  }
});
