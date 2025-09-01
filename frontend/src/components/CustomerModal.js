import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import TextBox from "./TextBox";

export default function CustomerModal({ visible, onClose }) {
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState(0)

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                <FontAwesomeIcon 
                                    icon={faStar} 
                                    size={35} 
                                    style={{ 
                                        color: star <= rating ? "#FFD700" : "#CCC"
                                    }} 
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TextBox 
                        label="Descrição"
                        placeholder="Descreva o que achou do serviço oferecido"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                            <Text style={styles.buttonTextClose}>Voltar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonConfirm} >
                            <Text style={styles.buttonTextConfirm}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center"
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "100%",
        height: "60%",
    },
    stars: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginTop: "5%"
    },
    iconStar: {
        color: "#CCC"
    },
    buttons: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-end"
    },
    buttonClose: {
        backgroundColor: "#CCC",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonConfirm: {
        backgroundColor: "#007BFF",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonTextClose: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonTextConfirm: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});