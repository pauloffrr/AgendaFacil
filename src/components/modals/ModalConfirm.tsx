import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { colors } from "@/src/styles/theme";
import { ModalConfirmProps } from "@/src/types/ModalConfirmType";
import { DuoButtons } from "../buttons/DuoButtons";

export const ModalConfirm: React.FC<ModalConfirmProps> = ({ visible, text, buttonProps }) => {

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.content}>
                        <Text style={styles.text}>{ text }</Text>

                        <View style={styles.buttons}>
                            <DuoButtons {...buttonProps} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: colors.dark_background,
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: "5%",
        borderRadius: 10,
        width: "100%",
        height: 230,
    },
    content: {
        gap: "30%"
    },
    text: {
        fontSize: 20,
        marginTop: "10%",
        fontWeight: 600
    },
    buttons: {
        alignItems: "flex-end"
    }
});