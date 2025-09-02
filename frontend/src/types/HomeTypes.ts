import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  "Customer Date": { id: number; name: string }
};

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export interface HomeProps {
  navigation: HomeNavigationProp;
}