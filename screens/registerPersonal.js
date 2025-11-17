import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

export default function RegisterPersonal({ route, navigation }) {

    const { username, email, pass } = route.params;

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dni, setDni] = useState("");
    const [fecha, setFecha] = useState("");

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirm = (date) => {
        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const año = date.getFullYear();
        setFecha(`${dia}/${mes}/${año}`);
        setDatePickerVisibility(false);
    };

    const handleNext = () => {
        if (!nombre || !apellido || !dni || !fecha) {
            Alert.alert("Error", "Completa todos los campos.");
            return;
        }

        navigation.navigate("RegisterBiometrics", {
            username,
            email,
            pass,
            nombre,
            apellido,
            dni,
            fecha
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={26} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>¡Ahora tus datos personales!</Text>

            <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
            <TextInput style={styles.input} placeholder="DNI" keyboardType="numeric" value={dni} onChangeText={setDni} />

            <TouchableOpacity style={styles.input} onPress={() => setDatePickerVisibility(true)}>
                <Text>{fecha || "Fecha de nacimiento"}</Text>
            </TouchableOpacity>

            <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={() => setDatePickerVisibility(false)} />

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        backgroundColor: "#FFFFFF"
    },
    backButton: {
        width: 35,
        height: 35,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 30,
        color: "#000"
    },
    input: {
        backgroundColor: "#F4F4F4",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16
    },
    dateInput: {
        backgroundColor: "#F4F4F4",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#0A1F44",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        color: "#FFF",
        fontSize: 17,
        fontWeight: "600"
    },
    footer: {
        position: "absolute",
        bottom: 25,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
    },
    footerText: {
        fontSize: 14,
        color: "#444",
    },
    footerLink: {
        fontSize: 14,
        color: "#007BFF",
        fontWeight: "600",
    },
});
