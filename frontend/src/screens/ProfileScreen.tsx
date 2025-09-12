import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { profileSectionsForClient, profileSectionsForCompany } from "@/src/data/ProfileSectionMock";
import { ProfileScreenProps } from "@/src/types/ProfileScreenType";
import { ExpandableSection } from "@/src/components/sections/ExpandableSection";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { colors } from "@/src/styles/theme";

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ userType }) => {
    const sections = userType === "client" ? profileSectionsForClient : profileSectionsForCompany;

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <BackButton />
                <Logo />

                <Image source={require("../assets/profissional.webp")} style={styles.img} />

                <ScrollView>
                    {sections.map(({ key, label, component: Section }) => (
                        <ExpandableSection key={key} label={label}>
                            <Section key={key} label={label}/>
                        </ExpandableSection>
                    ))}
                </ScrollView>
            </View>

            {userType ? <CustomerNavigationBar /> : <CompanyNavigationBar />}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: "5%",
        backgroundColor: colors.white
    },
    img: {
        width: "70%",
        height: "25%",
        borderRadius: 3,
        alignSelf: "center",
        marginVertical: "10%"
    },
})