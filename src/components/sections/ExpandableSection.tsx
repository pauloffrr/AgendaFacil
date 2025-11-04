import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ExpandableSectionProps } from "@/src/types/ExpandableSectionType";
import { colors } from "@/src/styles/theme";

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ label, children }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.header}>
                <Text style={styles.label}>{label}</Text>
                <FontAwesomeIcon icon={expanded ? (faChevronDown as IconProp) : (faChevronRight as IconProp)} style={styles.icon} />
            </TouchableOpacity>

            {expanded && <View style={styles.content}>{children}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: "5%",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.light_gray,
        borderRadius: 8
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5%",
        backgroundColor: colors.background_input
    },
    label: {
        fontSize: 16,
        fontWeight: "bold"
    },
    icon: {
        color: colors.gray
    },
    content: {
        padding: "5%",
        backgroundColor: colors.white
    }
});
