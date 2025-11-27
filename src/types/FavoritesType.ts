import { Professional } from "./ProfessionalType";

export interface FavoritesType {
    idFavorites: number;
    customerId: number;
    companyId: number;
    company: Professional
}