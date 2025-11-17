import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ContactUs({ navigation }) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!subject.trim() || !message.trim()) {
            Alert.alert("Error", "Completa todos los campos antes de enviar.");
            return;
        }

        // integrar a firebase y hacerlo llegar a un gmail
        Alert.alert("Mensaje enviado", "Gracias por contactarnos.");
        setSubject("");
        setMessage("");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={28} color="#0D1B4C" />
            </TouchableOpacity>

            <Text style={styles.title}>Contactanos</Text>

            <TextInput
                style={styles.input}
                placeholder="Asunto"
                value={subject}
                onChangeText={setSubject}
            />

            <TextInput
                style={[styles.input, { height: 150 }]}
                placeholder="Mensaje"
                value={message}
                onChangeText={setMessage}
                multiline
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.button} onPress={handleSend}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 60,
        backgroundColor: "#fff",
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 30,
        color: "#0D1B4C",
    },
    input: {
        backgroundColor: "#F3F5F7",
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E6E8EA",
    },
    button: {
        backgroundColor: "#0D1B4C",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
