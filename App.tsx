import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { UserProvider } from "./src/context/UserContext";
import { AppNavigation } from "./src/navigation/AppNavigation";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <AppNavigation />
      </UserProvider>
    </AuthProvider>
  );
};

export default App;