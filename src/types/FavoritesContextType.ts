import { Professional } from "@/src/types/ProfessionalType";

export interface FavoritesContextProps {
    favorites: Professional[];
    toggleFavorite: (professional: Professional) => void;
    isFavorite: (id: number) => boolean;
}