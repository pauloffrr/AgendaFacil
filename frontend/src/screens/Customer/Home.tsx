import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Logo } from "../../components/display/Logo";
import { UserIcon } from "../../components/buttons/UserIcon";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHelmetSafety,
  faBroom,
  faScissors,
  faShirt,
  faComputer,
  faCar,
  faPaw,
  faGraduationCap,
  faTruckFast,
  faChampagneGlasses,
  faUserTie,
  faEllipsis,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { CategoryMock } from "../../data/CategoriesMock";
import { ProfessionMock } from "../../data/ProfessionMock";
import { CustomerNavigationBar } from "../../components/display/CustomerNavigationBar";
import { Category } from "@/src/types/CategoryType";
import { Profession } from "../../types/ProfessionType";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { HomeProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";

const iconMap: Record<string, any> = {
  faHelmetSafety,
  faBroom,
  faScissors,
  faShirt,
  faComputer,
  faCar,
  faPaw,
  faGraduationCap,
  faTruckFast,
  faChampagneGlasses,
  faUserTie,
  faEllipsis,
};

export const CustomerHome: React.FC<HomeProps> = ({ navigation }) => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleProfile = () => {
    console.log("Perfil");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <UserIcon onPress={handleProfile}/>
      </View>

      <Text style={styles.title}>Escolha a categoria de serviços!</Text>

      <FlatList
        data={CategoryMock}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: Category }) => {
          const isExpanded = expandedCategory === item.id;
          const professions = ProfessionMock.filter(
            (prof: Profession) => prof.categoryId === item.id
          );

          return (
            <View>
              <TouchableOpacity onPress={() => toggleCategory(item.id)}>
                <View style={styles.selection}>
                  <View style={styles.categoryItems}>
                    <FontAwesomeIcon
                      icon={iconMap[item.icon]}
                      size={28}
                      style={styles.categoryIcon}
                    />
                    <Text style={styles.category}>{item.name}</Text>
                  </View>
                  <FontAwesomeIcon
                    icon={isExpanded ? faChevronDown as IconProp : faChevronRight as IconProp}
                    style={styles.buttonIcon}
                  />
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.professionList}>
                  {professions.map((prof: Profession) => (
                    <TouchableOpacity
                      key={prof.id}
                      onPress={() =>
                        navigation.navigate("Customer Date", {
                          id: prof.id,
                          name: prof.name,
                        })
                      }
                    >
                      <Text style={styles.professionItem}>• {prof.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={styles.separator} />
            </View>
          );
        }}
      />

      <CustomerNavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    padding: 15,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 30,
    marginTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  selection: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  categoryItems: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    color: colors.blue,
  },
  category: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
  },
  buttonIcon: {
    color: colors.gray,
  },
  separator: {
    height: 1,
    backgroundColor: colors.light_gray,
    marginVertical: 10,
    margin: 15,
  },
  professionList: {
    marginLeft: 40,
    marginTop: 8,
  },
  professionItem: {
    fontSize: 16,
    color: colors.gray,
    marginVertical: 3,
  },
});