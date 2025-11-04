import React, { createContext, useContext, useState, ReactNode } from "react";
import { Professional } from "@/src/types/ProfessionalType";
import { FavoritesContextProps } from "../types/FavoritesContextType";


const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Professional[]>([]);

  const toggleFavorite = (professional: Professional) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === professional.id);

      if (exists) {
        return prev.filter((p) => p.id !== professional.id);
      }

      return [...prev, professional];
    });
  };

  const isFavorite = (id: number) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites precisa estar dentro do FavoritesProvider");
  }
  
  return context;
};