import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { CardProfessional } from "@/src/components/display/CardProfessional";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { ProfessionalMock } from "@/src/data/ProfessionalsMock";
import { ProfessionalsAvailableProps } from "@/src/types/CustomerStackType";
import { colors } from "@/src/styles/theme";

export const ProfessionalsAvailable: React.FC<ProfessionalsAvailableProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { name } = route.params;

  const handleProfile = () => {
    console.log("Perfil");
  };

  const filteredProfessionals = ProfessionalMock.filter(
    (prof) => prof.professionId === id
  );

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <BackButton
          onPress={() => navigation.navigate("Customer Date", { id, name })}
        />

        <View style={styles.header}>
          <Logo />
          <UserIcon onPress={handleProfile}/>
        </View>

        {filteredProfessionals.length > 0 ? (
          <>
            <Text style={styles.title}>
              {name}(s) disponíveis na data desejada
            </Text>

            {filteredProfessionals.map((prof) => (
              <CardProfessional
                key={prof.id}
                professional={prof}
                onPress={() =>
                  navigation.navigate("Professional Profile", {
                    professionalId: prof.id,
                    professionId: id,
                    professionName: name,
                  })
                }
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum profissional cadastrado para a profissão {name} na sua região.
            </Text>
          </View>
        )}
      </View>

      <CustomerNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: "5%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10%",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: "10%",
    marginTop: "20%",
  },
  card: {
    borderColor: colors.light_gray,
    borderStyle: "solid",
    borderWidth: 2,
    height: "130%",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
  },
  img: {
    width: "120%",
    height: "126%",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: colors.gray,
    textAlign: "center",
  }
});