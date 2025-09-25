import { createContext, ReactNode, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
    token: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem("authToken");
            if (storedToken) setToken(storedToken);
            setLoadingAuth(false);
        };
        loadToken();
    }, []);

    const login = async (newToken: string) => {
        try {
            await AsyncStorage.setItem("authToken", newToken);
            setToken(newToken);
            console.log("Token salvo:", newToken);
        } catch (err) {
            console.error("Error saving token:", err);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("authToken");
        setToken(null);
    };

    if (loadingAuth) return null;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: token ? true : false }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) throw new Error("useAuth needs to be inside the AuthProvider")
    return context
}