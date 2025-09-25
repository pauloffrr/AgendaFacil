import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { profileSectionsForClient, profileSectionsForCompany } from "@/src/data/ProfileSectionMock";
import { ExpandableSection } from "@/src/components/sections/ExpandableSection";
import { BackButton } from "@/src/components/buttons/BackButton";
import { Logo } from "@/src/components/display/Logo";
import { CustomerNavigationBar } from "@/src/components/display/CustomerNavigationBar";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { colors } from "@/src/styles/theme";
import { useUser } from "@/src/context/UserContext";
import { useAuth } from "@/src/context/AuthContext";
import { LogoutModal } from "../components/modals/LogoutModal";

export const ProfileScreen: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useUser();
    const { logout } = useAuth();

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
    const sections = userType === "CUSTOMER" ? profileSectionsForClient : profileSectionsForCompany;

    const handleLogoutPress = () => {
        setModalVisible(true);
    }

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

                    <View style={styles.div}>
                        <TouchableOpacity style={styles.button} onPress={() => handleLogoutPress()}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <LogoutModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={() => { logout() }}
                />
            </View>

            {userType === "CUSTOMER" ? <CustomerNavigationBar /> : <CompanyNavigationBar />}
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
    div: {
        alignItems:"flex-end",
    },
    button: { 
        backgroundColor: colors.red, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 8, 
        width: "30%"
    }, 
    buttonText: { 
        color: colors.white, 
        fontWeight: "bold", 
        fontSize: 17
    }
})