import { createContext, useContext, useEffect, useState } from "react"
import Toast from 'react-native-toast-message';
import { useAuth } from "./AuthContext"
import api from "@/src/services/Api";

interface User {
    idUser: string;
    name: string;
    email: string;
    userType: "CUSTOMER" | "COMPANY";
}

interface UpdateUserPayload {
    name: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
}

interface UserContextProps {
    user: User | null;
    setUser: (User: User) => void;
    updateUser: (updatedUser: UpdateUserPayload) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, isAuthenticated, logout } = useAuth()
    const [user, setUser] = useState<User | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token || !isAuthenticated) {
                setUser(null);
                setLoadingUser(false);
                return;
            }

            try {
                const response = await api.get("/login/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(response.data.user)

            } catch (error: any) {
                console.error("Error when searching for user:", error);

                if (error.response?.status === 401) {
                    await logout();
                    Toast.show({
                        type: 'error',
                        text1: 'Sessão expirada. Faça login novamente.'
                    });
                    setUser (null);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error loading user information.'
                    });
                    setUser (null);
                }
            } finally {
                setLoadingUser(false);
            }
        };

            fetchUser();
        }, [token, isAuthenticated, logout]);

    const updateUser = async (updateUser: UpdateUserPayload) => {
        try {
            const response = await api.put(`/user/${user?.idUser}`, updateUser, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(response.data)

            Toast.show({
                type: 'success',
                text1: 'User updated successfully!'
            });

        } catch (error) {
            console.error("Error updating user:", error)

            Toast.show({
                type: 'error',
                text1: 'Error updating user. Please try again.'
            });
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
        { !loadingUser && children }
        </UserContext.Provider>
    );
};

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser must be inside the UserProvider");
  }

  return context
}