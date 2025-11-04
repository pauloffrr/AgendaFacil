import { CalculateReviews } from "@/src/types/CalculateReviewsType";
import { StyleProp, ViewStyle } from "react-native";

export interface AverageRatingProps {
    reviews: CalculateReviews[];
    style?: StyleProp<ViewStyle>;
};