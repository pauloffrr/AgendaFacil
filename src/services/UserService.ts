import { API_URL_USERS } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AvatarUpdateResponse {
  avatarUrl: string;
}

/**
 * @param userId
 * @param userType
 * @param uri
 * @returns
 */
export const uploadAvatarToApi = async (
  userId: number,
  userType: "CUSTOMER" | "COMPANY",
  uri: string
): Promise<string> => {
  const endpoint =
    userType === "CUSTOMER"
      ? `/customer/${userId}/avatar`
      : `/company/${userId}/avatar`;

  const formData = new FormData();

  const filename = uri.split("/").pop() || "avatar.jpg";
  const fileExtension = filename.split(".").pop()?.toLowerCase();
  const fileType = fileExtension === "png" ? "image/png" : "image/jpeg";

  const fileToUpload = {
    uri: uri,
    name: filename,
    type: fileType === "image/png" ? "image/png" : "image/jpeg",
  };

  formData.append("avatar", fileToUpload as any);

  const url = `${API_URL_USERS}${endpoint}`;
  try {
    const token = await AsyncStorage.getItem("authToken");
    const headers: any = {
      Accept: "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: formData as any,
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Upload falhou: ${res.status} ${body}`);
    }

    const json = await res.json();
    return json.avatarUrl || json.url || "";
  } catch (error: any) {
    console.error("uploadAvatarToApi error:", error);
    const errorMessage =
      error.message || "Erro de rede ou validação desconhecido.";
    throw new Error(errorMessage);
  }
};
