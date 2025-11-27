import { BackButton } from "@/src/components/buttons/BackButton";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { Logo } from "@/src/components/display/Logo";
import { ExpandableSection } from "@/src/components/sections/ExpandableSection";
import { useAuth } from "@/src/context/AuthContext";
import { useUser } from "@/src/context/UserContext";
import {
  profileSectionsForClient,
  profileSectionsForCompany,
} from "@/src/data/ProfileSectionMock";
import { uploadAvatarToApi } from "@/src/services/UserService";
import { colors } from "@/src/styles/theme";
import { API_URL_USERS } from "@env";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LogoutModal } from "../components/modals/LogoutModal";

const BASE_URL_UPLOADS = API_URL_USERS;

export const ProfileScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const _userContext: any = useUser();
  const user = _userContext?.user;
  const setUser: ((u: any) => void) | undefined =
    typeof _userContext?.setUser === "function"
      ? _userContext.setUser
      : undefined;
  const updateUser: ((u: any) => void) | undefined =
    typeof _userContext?.updateUser === "function"
      ? _userContext.updateUser
      : undefined;
  const { logout } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [localUri, setLocalUri] = useState<string | null>(null);

  const getUserType = () => {
    if (!user) return "CUSTOMER";

    if (user.userType === "CUSTOMER") {
      return "CUSTOMER";
    } else if (user.userType === "COMPANY") {
      return "COMPANY";
    }

    return "CUSTOMER";
  };

  const userType = getUserType();
  const sections =
    userType === "CUSTOMER"
      ? profileSectionsForClient
      : profileSectionsForCompany;

  const handleLogoutPress = () => {
    setModalVisible(true);
  };

  async function pickImageAndUpload() {
    if (isUploading) {
      Alert.alert("Aguarde", "Envio em andamento.");
      return;
    }

    const userId = user?.idUser as number | undefined;
    const type = user?.userType as "CUSTOMER" | "COMPANY" | undefined;

    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão negada",
          "Permissão de acesso à galeria é necessária."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri as string;

      setLocalUri(uri);

      if (!userId || !type) {
        Alert.alert(
          "Pré-visualização",
          "Imagem selecionada. Faça login para enviar ao servidor."
        );
        return;
      }

      setIsUploading(true);

      const newAvatarUrlPath = await uploadAvatarToApi(userId, type, uri);

      if (typeof setUser === "function") {
        setUser({ ...user, avatarUrl: newAvatarUrlPath });
      } else if (typeof updateUser === "function") {
        try {
          await updateUser({ name: user?.name ?? "", email: user?.email });
          setLocalUri(`${BASE_URL_UPLOADS}${newAvatarUrlPath}`);
        } catch (e) {
          console.warn("updateUser fallback failed", e);
          setLocalUri(`${BASE_URL_UPLOADS}${newAvatarUrlPath}`);
        }
      } else {
        console.warn(
          "Nenhuma função de atualização de usuário disponível no contexto; atualizando apenas preview local."
        );
        setLocalUri(`${BASE_URL_UPLOADS}${newAvatarUrlPath}`);
      }

      Alert.alert("Sucesso", "Avatar atualizado!");
    } catch (err: any) {
      console.error("pickImageAndUpload error", err);
      const errorMessage = err.message || "Erro desconhecido ao enviar imagem.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setIsUploading(false);
    }
  }

  const avatarSource = localUri
    ? { uri: localUri }
    : user?.avatarUrl
    ? { uri: `${BASE_URL_UPLOADS}${user.avatarUrl}` }
    : require("../assets/profissional.webp");

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <BackButton />
        <Logo />

        {/* 3. Renderização da Imagem e Loading */}
        <TouchableOpacity onPress={pickImageAndUpload} disabled={isUploading}>
          <Image
            source={avatarSource}
            style={styles.img}
            onError={(e) => {
              console.log("Image load error:", e.nativeEvent);
            }}
          />
          {isUploading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.white} />
            </View>
          )}
        </TouchableOpacity>

        <ScrollView>
          {sections.map(({ key, label, component: Section }) => (
            <ExpandableSection key={key} label={label}>
              <Section key={key} label={label} />
            </ExpandableSection>
          ))}

          <View style={styles.divButtons}>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={pickImageAndUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.buttonTextSecondary}>
                  {user?.avatarUrl ? "Mudar Foto" : "Escolher Foto"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => handleLogoutPress()}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <LogoutModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={() => {
            logout();
          }}
        />
      </View>

      {userType === "CUSTOMER" ? (
        <CustomerNavigationBar />
      ) : (
        <CompanyNavigationBar />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: "5%",
    backgroundColor: colors.white,
  },
  img: {
    width: "80%",
    aspectRatio: 1,
    height: undefined,
    borderRadius: 12,
    alignSelf: "center",
    marginVertical: "8%",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  divButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
  },
  primaryButton: {
    backgroundColor: colors.red,
  },
  secondaryButton: {
    backgroundColor: colors.gray,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 17,
  },
  buttonTextSecondary: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 17,
  },
});
