import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TextBox } from "@/src/components/inputs/TextBox";
import { CustomerReviewModalProps } from "@/src/types/CustomerModalType";
import { colors } from "@/src/styles/theme";

export const CustomerReviewModal: React.FC<CustomerReviewModalProps> = ({ visible, onClose, onSubmitReview }) => {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handleSend = () => {
    if (onSubmitReview) onSubmitReview(description, rating);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <FontAwesomeIcon
                  icon={faStar as IconProp}
                  size={35}
                  style={{ color: star <= rating ? colors.yellow : colors.light_gray }}
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

            <TouchableOpacity style={styles.buttonConfirm} onPress={handleSend}>
              <Text style={styles.buttonTextConfirm}>Enviar</Text>
            </TouchableOpacity>
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
    height: 450,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "5%",
    marginTop: "5%",
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
  buttonConfirm: {
    backgroundColor: colors.blue,
    paddingVertical: "3.5%",
    paddingHorizontal: "5%",
    borderRadius: 5,
  },
  buttonTextClose: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonTextConfirm: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
  }
});