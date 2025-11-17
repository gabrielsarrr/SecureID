import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from '@expo/vector-icons';

import appFirebase from "../credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export default function RegisterBiometrics({ route, navigation }) {

    const {
        username,
        email,
        pass,
        nombre,
        apellido,
        dni,
        fecha
    } = route.params;

    const [biometriaOK, setBiometriaOK] = useState(false);

    const handleFingerprint = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();

        if (!compatible || !supported.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
            Alert.alert("No disponible", "Tu dispositivo no soporta huellas.");
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Coloca tu huella",
        });

        if (result.success) {
            setBiometriaOK(true);
            Alert.alert("Éxito", "Huella verificada.");
        } else {
            Alert.alert("Falló", "No se pudo reconocer la huella.");
        }
    };

    const createAccount = async () => {

        if (!biometriaOK) {
            Alert.alert("Error", "Debes verificar tu huella antes de continuar.");
            return;
        }

        try {
            // 1. Crear usuario en Auth
            const userCred = await createUserWithEmailAndPassword(auth, email, pass);
            const uid = userCred.user.uid;

            // 2. Guardar información en Firestore
            await setDoc(doc(db, "usuarios", uid), {
                username,
                email,
                nombre,
                apellido,
                dni,
                fechaNacimiento: fecha,
                biometria: true,
                createdAt: new Date()
            });

            Alert.alert("Cuenta creada", "Tu cuenta ha sido registrada correctamente.");
            navigation.navigate("Menu");

        } catch (error) {
            console.log(error);
            Alert.alert("Error", "No se pudo crear la cuenta.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={26} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>¡Verificación biométrica!</Text>

            <TouchableOpacity style={styles.biometricBox} onPress={handleFingerprint}>
                <Ionicons name="finger-print-outline" size={90} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextBtn} onPress={createAccount}>
                <Text style={styles.nextText}>Crear cuenta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: "#fff",
    },
    backBtn: {
        marginTop: 40,
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        marginTop: 25,
    },
    biometricBox: {
        width: "100%",
        height: 150,
        backgroundColor: "#F5F7FA",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    nextBtn: {
        backgroundColor: "#0A2A5D",
        paddingVertical: 15,
        marginTop: 40,
        borderRadius: 10,
    },
    nextText: {
        color: "#fff",
        textAlign: "center",
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
