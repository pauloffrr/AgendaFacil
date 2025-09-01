import { Review } from "../types/review";

export function calculateAverage(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, r) => total + r.rating, 0);
  return sum / reviews.length;
}

export function countRatings(reviews: Review[]): Record<number, number> {
  return [1, 2, 3, 4, 5].reduce<Record<number, number>>((acc, rating) => {
    acc[rating] = reviews.filter((r) => r.rating === rating).length;
    return acc;
  }, {});
}