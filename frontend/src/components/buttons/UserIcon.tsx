import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ProfileProp } from "@/src/types/CustomerStackType";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/src/styles/theme";

export const UserIcon: React.FC = () => {
    const navigation = useNavigation<ProfileProp>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <FontAwesomeIcon icon={faCircleUser as IconProp} style={styles.icon} size={30} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    icon: {
        color: colors.blue,
        marginTop: "10%",
        marginBottom: "5%"
    }
});