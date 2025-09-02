import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
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

import { categoryMock } from "../../data/categoryMock";
import { professionMock } from "../../data/professionMock";
import { CustomerNavigationBar } from "../../components/display/CustomerNavigationBar";

const iconMap = {
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

export default function Home({ navigation }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <UserIcon />
      </View>

      <Text style={styles.title}>Escolha a categoria de serviços!</Text>

      <FlatList
        data={categoryMock}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isExpanded = expandedCategory === item.id;
          const professions = professionMock.filter(
            (prof) => prof.categoryId === item.id
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
                    icon={isExpanded ? faChevronDown : faChevronRight}
                    style={styles.buttonIcon}
                  />
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.professionList}>
                  {professions.map((prof) => (
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

      <CustomerNavigationBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    color: "#007BFF",
  },
  category: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
  },
  buttonIcon: {
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
    margin: 15,
  },
  professionList: {
    marginLeft: 40,
    marginTop: 8,
  },
  professionItem: {
    fontSize: 16,
    color: "#333",
    marginVertical: 3,
  },
});
