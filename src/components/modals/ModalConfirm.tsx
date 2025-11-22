import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { colors } from "@/src/styles/theme";
import { ModalConfirmProps } from "@/src/types/ModalConfirmType";
import { DuoButtons } from "../buttons/DuoButtons";

export const ModalConfirm: React.FC<ModalConfirmProps> = ({ visible, text, content, buttonProps, height }) => {

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={[styles.modalContent, height ? { height } : {}]}>
                    <View style={styles.content}>
                        <Text style={styles.text}>{ text }</Text>

                        {content && (
                            <View style={styles.customContent}>
                                {content}
                            </View>
                        )}

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
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: "5%",
        borderRadius: 10,
        width: "100%"
    },
    content: {
        gap: "5%"
    },
    text: {
        fontSize: 20,
        marginTop: "10%",
        fontWeight: 600
    },
    customContent: {
        margin: 0
    },
    buttons: {
        alignItems: "flex-end",
        marginTop: "10%" 
    }
});