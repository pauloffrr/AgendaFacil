import React from "react";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { AppNavigation } from "./src/navigation/AppNavigation";

const Home: React.FC = () => {
  return (
    <FavoritesProvider>
      <AppNavigation />
    </FavoritesProvider>
  );
}

export default Home;