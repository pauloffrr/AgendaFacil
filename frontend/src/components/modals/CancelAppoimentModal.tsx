import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { CustomerReviewModalProps } from "@/src/types/CustomerModalType";
import { colors } from "@/src/styles/theme";

export const CancelAppoimentModal: React.FC<CustomerReviewModalProps> = ({ visible, onClose, onSubmit }) => {

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.content}>
                        <Text style={styles.text}>Tem certeza que deseja cancelar este horário?</Text>

                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                                <Text style={styles.buttonTextClose}>Voltar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonCancel} onPress={onSubmit}>
                                <Text style={styles.buttonTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
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
        height: 200,
    },
    content: {
        gap: "25%",
        
    },
    text: {
        fontSize: 18,
        marginTop: "5%",
        fontWeight: 600
    },
    buttons: {
        flexDirection: "row",
        gap: "5%",
        justifyContent: "flex-end",
    },
    buttonClose: {
        backgroundColor: colors.light_gray,
        paddingVertical: "3.5%",
        paddingHorizontal: "5%",
        borderRadius: 5,
    },
    buttonCancel: {
        backgroundColor: colors.red,
        paddingVertical: "3.5%",
        paddingHorizontal: "5%",
        borderRadius: 5,
    },
    buttonTextClose: {
        color: colors.black,
        fontWeight: "bold",
        fontSize: 18,
    },
    buttonTextCancel: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 18,
    }
});