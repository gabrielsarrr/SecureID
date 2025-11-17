import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Register({ navigation }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleNext = () => {

        if (!username.trim() || !email.trim() || !pass.trim() || !confirmPass.trim()) {
            Alert.alert("Campos incompletos", "Completa todos los campos.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            Alert.alert("Correo inválido", "Ingresa un correo electrónico válido.");
            return;
        }

        if (pass.length < 6) {
            Alert.alert("Contraseña muy corta", "Debe tener al menos 6 caracteres.");
            return;
        }

        if (pass !== confirmPass) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        navigation.navigate("RegisterPersonal", {
            username,
            email,
            pass
        });
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={28} color="#0D1B4C" />
            </TouchableOpacity>

            <Text style={styles.title}>
                ¡Bienvenido!, crea tu{"\n"}cuenta para empezar
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#A0A0A0"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={true}
                value={pass}
                onChangeText={setPass}
            />

            <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={true}
                value={confirmPass}
                onChangeText={setConfirmPass}
            />

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextText}>Siguiente</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.footerLink}>Inicia sesión aquí</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 60,
        backgroundColor: "#FFFFFF",
    },
    backButton: {
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 35,
        color: "#0D1B4C",
        lineHeight: 36,
    },
    input: {
        backgroundColor: "#F3F5F7",
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E6E8EA",
    },
    nextButton: {
        backgroundColor: "#0D1B4C",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 15,
    },
    nextText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
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
