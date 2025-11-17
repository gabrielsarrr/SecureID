import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function MenuChangePassword({ navigation }) {
    const auth = getAuth();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [currentVisible, setCurrentVisible] = useState(false);
    const [newVisible, setNewVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'La contraseña nueva debe tener al menos 6 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'La nueva contraseña y la confirmación no coinciden');
            return;
        }

        setIsLoading(true);

        try {
            const user = auth.currentUser;

            // Re-autenticar al usuario con la contraseña actual
            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );

            await reauthenticateWithCredential(user, credential);

            // Actualizar contraseña
            await updatePassword(user, newPassword);

            Alert.alert('Éxito', 'La contraseña se ha actualizado correctamente');
            navigation.goBack();
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/wrong-password') {
                Alert.alert('Error', 'La contraseña actual es incorrecta');
            } else {
                Alert.alert('Error', 'No se pudo cambiar la contraseña. Intenta nuevamente');
            }
        } finally {
            setIsLoading(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
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
                <Text style={styles.title}>Cambiar Contraseña</Text>
                <Text style={styles.subtitle}>Ingresa tu contraseña actual y la nueva contraseña que deseas usar.</Text>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Contraseña actual"
                        placeholderTextColor="#A0A0A0"
                        secureTextEntry={!currentVisible}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setCurrentVisible(!currentVisible)}
                    >
                        <Ionicons
                            name={currentVisible ? "eye-off" : "eye"}
                            size={22}
                            color="#6E6E6E"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Contraseña nueva"
                        placeholderTextColor="#A0A0A0"
                        secureTextEntry={!newVisible}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setNewVisible(!newVisible)}
                    >
                        <Ionicons
                            name={newVisible ? "eye-off" : "eye"}
                            size={22}
                            color="#6E6E6E"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirmar contraseña"
                        placeholderTextColor="#A0A0A0"
                        secureTextEntry={!confirmVisible}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setConfirmVisible(!confirmVisible)}
                    >
                        <Ionicons
                            name={confirmVisible ? "eye-off" : "eye"}
                            size={22}
                            color="#6E6E6E"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[
                        styles.resetButton,
                        (!currentPassword || !newPassword || !confirmPassword || isLoading) && styles.resetButtonDisabled
                    ]}
                    onPress={handleChangePassword}
                    disabled={!currentPassword || !newPassword || !confirmPassword || isLoading}
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
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 60,
        backgroundColor: "#FFFFFF",
    },
    backButton: {
        marginBottom: 10,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 15,
        color: "#0D1B4C",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 40,
        lineHeight: 22,
    },
    passwordContainer: {
        backgroundColor: "#F3F5F7",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#E6E8EA",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    passwordInput: {
        fontSize: 15,
        flex: 1,
        marginRight: 10,
    },
    resetButton: {
        backgroundColor: "#0D1B4C",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    resetButtonDisabled: {
        backgroundColor: "#A0A0A0",
    },
    resetButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
