import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendCode = async () => {
        if (!email) {
            Alert.alert('Error', 'Por favor ingresa tu email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Por favor ingresa un email válido');
            return;
        }

        setIsLoading(true);

        try {
            // Simulación de envío de código
            await new Promise(resolve => setTimeout(resolve, 1500));

            Alert.alert(
                'Código enviado',
                `Se ha enviado un código de verificación a ${email}`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // REDIRIGIR A LA PANTALLA SECURITYCODE
                            navigation.navigate('SecurityCode', { email });
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'No se pudo enviar el código. Intenta nuevamente.');
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
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
                    <Text style={styles.subtitle}>
                        No te preocupes, introduce el email asociado a tu cuenta para recibir un código y recuperarlo.
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa el email asociado"
                        placeholderTextColor="#A0A0A0"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TouchableOpacity
                        style={[
                            styles.sendButton,
                            (!email || isLoading) && styles.sendButtonDisabled
                        ]}
                        onPress={handleSendCode}
                        disabled={!email || isLoading}
                    >
                        <Text style={styles.sendButtonText}>
                            {isLoading ? 'Enviando...' : 'Enviar código'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Recordaste tu contraseña? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.footerLink}>Iniciar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
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
    input: {
        backgroundColor: "#F3F5F7",
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 15,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#E6E8EA",
    },
    instructions: {
        marginBottom: 40,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    instructionText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 10,
    },
    sendButton: {
        backgroundColor: "#0D1B4C",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 30,
    },
    sendButtonDisabled: {
        backgroundColor: "#A0A0A0",
    },
    sendButtonText: {
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