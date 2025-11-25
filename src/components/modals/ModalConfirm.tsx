import React from "react";
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback } from "react-native";
import { colors } from "@/src/styles/theme";
import { ModalConfirmProps } from "@/src/types/ModalConfirmType";
import { DuoButtons } from "../buttons/DuoButtons";
import { DateTimeInput } from "../inputs/DateTimeInput";
import { Input } from "../inputs/Input";

export const ModalConfirm: React.FC<ModalConfirmProps> = ({ 
    visible, 
    text, 
    inputType = 'none', 
    timeValue, 
    onPressTime,
    budget,
    onChangeBudget,
    buttonProps, 
    height 
}) => {

    const renderInput = () => {
        switch (inputType) {
            case 'time':
                return (
                    <DateTimeInput
                        label="Horário Final"
                        placeholder="hh:mm"
                        value={timeValue || ""}
                        onPressIn={onPressTime}
                    />
                );
            case 'budget':
                return (
                    <Input 
                        label="Orçamento"
                        placeholder="Digite o orçamento do serviço"
                        value={budget || ""}
                        onChangeText={onChangeBudget}
                        keyboardType="numeric"
                    />
                );
            case 'none':
            default:
                return null;
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={buttonProps.secondOnPress}>
            <TouchableWithoutFeedback>
                <View style={styles.overlay}>
                    <View style={[styles.modalContent, height ? { height } : {}]}>
                        <View style={styles.content}>
                            <Text style={styles.text}>{ text }</Text>

                            {renderInput()}

                            <View style={styles.buttons}>
                                <DuoButtons 
                                    firstOnPress={buttonProps.firstOnPress}
                                    secondOnPress={buttonProps.secondOnPress}
                                    firstButtonText={buttonProps.firstButtonText}
                                    secondButtonText={buttonProps.secondButtonText}
                                    firstButtonColor={buttonProps.firstButtonColor}
                                    secondButtonColor={buttonProps.secondButtonColor}
                                    firstTextColor={buttonProps.firstTextColor}
                                    secondTextColor={buttonProps.secondTextColor}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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