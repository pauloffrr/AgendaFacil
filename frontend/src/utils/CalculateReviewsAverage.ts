import { CalculateReviews } from "../types/CalculateReviewsType";

export function calculateAverage(reviews: CalculateReviews[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, r) => total + r.rating, 0);
  return sum / reviews.length;
}

export function countRatings(reviews: CalculateReviews[]): Record<number, number> {
  return [1, 2, 3, 4, 5].reduce<Record<number, number>>((acc, rating) => {
    acc[rating] = reviews.filter((r) => r.rating === rating).length;
    return acc;
  }, {});
}