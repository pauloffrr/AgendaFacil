import React from "react";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { AuthProvider } from "./src/context/AuthContext";
import { UserProvider } from "./src/context/UserContext";
import { AppNavigation } from "./src/navigation/AppNavigation";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <FavoritesProvider>
          <AppNavigation />
        </FavoritesProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;