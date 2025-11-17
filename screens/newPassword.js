import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import appFirebase from "../credenciales";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function NewPassword({ navigation, route }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { email } = route.params || {};

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        setIsLoading(true);

        try {
            // 1️⃣ Actualizar en Firestore
            const q = query(collection(db, "usuarios"), where("email", "==", email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                Alert.alert("Error", "Usuario no encontrado");
                setIsLoading(false);
                return;
            }

            snapshot.forEach(async (docSnap) => {
                await updateDoc(doc(db, "usuarios", docSnap.id), { password: newPassword });
            });

            // 2️⃣ Actualizar en Firebase Auth
            // No podemos cambiar directamente sin reautenticación en front-end
            // Entonces usamos sendPasswordResetEmail para forzar un cambio seguro
            await sendPasswordResetEmail(auth, email);
            
            // Pasar a pantalla ChangedPassword
            navigation.navigate('ChangedPassword');

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'No se pudo cambiar la contraseña');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={28} color="#0D1B4C" />
            </TouchableOpacity>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <Text style={styles.title}>Nueva Contraseña</Text>
                <Text style={styles.subtitle}>Tu contraseña debe ser única respecto a todas las utilizadas anteriormente.</Text>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Nueva contraseña"
                        placeholderTextColor="#A0A0A0"
                        secureTextEntry={!passwordVisible}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={22} color="#6E6E6E" />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirmar contraseña"
                        placeholderTextColor="#A0A0A0"
                        secureTextEntry={!confirmPasswordVisible}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                        <Ionicons name={confirmPasswordVisible ? "eye-off" : "eye"} size={22} color="#6E6E6E" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.resetButton, (!newPassword || !confirmPassword || isLoading) && styles.resetButtonDisabled]}
                    onPress={handleResetPassword}
                    disabled={!newPassword || !confirmPassword || isLoading}
                >
                    <Text style={styles.resetButtonText}>
                        {isLoading ? 'Actualizando...' : 'Cambiar contraseña'}
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 25, paddingTop: 60, backgroundColor: "#FFFFFF" },
    backButton: { marginBottom: 10 },
    content: { flex: 1 },
    title: { fontSize: 28, fontWeight: "700", marginBottom: 15, color: "#0D1B4C" },
    subtitle: { fontSize: 16, color: "#666", marginBottom: 40, lineHeight: 22 },
    passwordContainer: { backgroundColor: "#F3F5F7", borderRadius: 10, paddingHorizontal: 15, paddingVertical: 14, borderWidth: 1, borderColor: "#E6E8EA", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
    passwordInput: { fontSize: 15, flex: 1, marginRight: 10 },
    resetButton: { backgroundColor: "#0D1B4C", paddingVertical: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
    resetButtonDisabled: { backgroundColor: "#A0A0A0" },
    resetButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
