import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { reviewsMock } from "../data/reviewsMock";
import * as Progress from "react-native-progress";

export default function AverageRating() {
    const totalReviews = reviewsMock.length;
    const average = reviewsMock.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
    const ratingCounts = [1, 2, 3, 4, 5].reduce((acc, rating) => {
        acc[rating] = reviewsMock.filter((r) => r.rating === rating).length;
        return acc;
    }, {});

    return (
        <View>
            <Text style={styles.textAverage}>Média de Avaliações</Text>
            
            <View style={styles.card}>
                <View style={styles.first}>
                    <View style={styles.totalAverage}>
                        <Text style={styles.number}>{ average.toFixed(1) }</Text>
                        <View style={styles.stars}>
                            <FontAwesomeIcon icon={faStar} size={15} style={styles.iconStar} />
                            <FontAwesomeIcon icon={faStar} size={15} style={styles.iconStar} />
                            <FontAwesomeIcon icon={faStar} size={15} style={styles.iconStar} />
                            <FontAwesomeIcon icon={faStar} size={15} style={styles.iconStar} />
                            <FontAwesomeIcon icon={faStar} size={15} style={styles.iconStar} />
                        </View>
                    </View>

                    <View style={styles.infoReviews}>
                        <Text style={styles.textReview}>Média com base em</Text>
                        <Text>{ totalReviews } avaliações</Text>
                    </View>
                </View>

                <View style={styles.second}>
                    {[5, 4, 3, 2, 1].map((rating) => {
                        const count = ratingCounts[rating] || 0;
                        const percentage = totalReviews ? count / totalReviews : 0;
                        return (
                            <View style={styles.rows} key={rating}>
                                <Text>{rating}</Text>
                                <FontAwesomeIcon icon={faStar} size={15} style={styles.iconStar}/>
                                <Progress.Bar style={styles.progressBar} progress={percentage} />
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textAverage: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 30,
    },
    card: {
        flex: 1,
        borderColor: "#dfdedeff",
        borderStyle: "solid",
        borderWidth: 2,
        height: "100%",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        marginBottom: 30,
        marginTop: 10,
    },
    first: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 15
    },
    totalAverage: {
        marginBottom: 20,
    },
    number: {
        fontSize: 44,
        fontWeight: "700",
    },
    stars: {
        display: "flex",
        flexDirection: "row",
        gap: 2,
    },
    iconStar: {
        color: "#f1c40f"
    },
    infoReviews: {
        marginBottom: 10,
    },
    textReview: {
        color: "#858585ff",
        fontSize: 14,
    },
    second: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10
    },
    rows: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: 1
    },
    progressBar: {
        width: 100,
    }
});