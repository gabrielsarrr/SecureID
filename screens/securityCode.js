import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SecurityCode({ navigation, route }) {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const [isLoading, setIsLoading] = useState(false);

    // Obtener el email de los parámetros de navegación
    const { email } = route.params || { email: 'tu correo electrónico' };

    const handleCodeChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Auto-focus siguiente input
        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }

        // Auto-enviar cuando todos los campos están llenos
        if (text && index === 5 && newCode.every(digit => digit !== '')) {
            handleVerify();
        }
    };

    const handleKeyPress = (e, index) => {
        // Manejar backspace
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleVerify = async () => {
        const verificationCode = code.join('');

        if (verificationCode.length !== 6) {
            Alert.alert('Error', 'Por favor ingresa el código completo de 6 dígitos');
            return;
        }

        setIsLoading(true);

        try {
            // Simulación de verificación
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Aquí iría la lógica real de verificación
            console.log('Código verificado:', verificationCode);

            // REDIRIGIR DIRECTAMENTE A NEWPASSWORD SIN ALERT
            navigation.navigate('NewPassword', {
                email: email,
                verificationCode: verificationCode
            });

        } catch (error) {
            Alert.alert('Error', 'Código incorrecto. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            Alert.alert(
                'Código reenviado',
                `Se ha enviado un nuevo código a ${email}`,
                [{ text: 'OK' }]
            );
        } catch (error) {
            Alert.alert('Error', 'No se pudo reenviar el código');
        } finally {
            setIsLoading(false);
        }
    };

    const focusInput = (index) => {
        if (inputs.current[index]) {
            inputs.current[index].focus();
        }
    };

    return (
        <View style={styles.container}>
            {/* Botón de regreso */}
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
                {/* Título y descripción */}
                <Text style={styles.title}>Código de seguridad</Text>
                <Text style={styles.subtitle}>
                    Introduce el código de seguridad que enviamos a {email}
                </Text>

                {/* Inputs del código */}
                <View style={styles.codeContainer}>
                    {code.map((digit, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => focusInput(index)}
                            activeOpacity={0.7}
                        >
                            <TextInput
                                ref={ref => inputs.current[index] = ref}
                                style={[
                                    styles.codeInput,
                                    digit && styles.codeInputFilled
                                ]}
                                value={digit}
                                onChangeText={(text) => handleCodeChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                selectTextOnFocus
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={[
                        styles.verifyButton,
                        (code.join('').length !== 6 || isLoading) && styles.verifyButtonDisabled
                    ]}
                    onPress={handleVerify}
                    disabled={code.join('').length !== 6 || isLoading}
                >
                    <Text style={styles.verifyButtonText}>
                        {isLoading ? 'Verificando...' : 'Verificar'}
                    </Text>
                </TouchableOpacity>

                {/* Reenviar código */}
                <TouchableOpacity
                    style={styles.resendContainer}
                    onPress={handleResendCode}
                    disabled={isLoading}
                >
                    <Text style={styles.resendText}>
                        ¿No recibiste el código?{' '}
                        <Text style={styles.resendLink}>Reenviar código</Text>
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
        marginBottom: 50,
        lineHeight: 22,
        textAlign: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    codeInput: {
        width: 50,
        height: 60,
        backgroundColor: "#F3F5F7",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E6E8EA",
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: "#0D1B4C",
    },
    codeInputFilled: {
        borderColor: "#0D1B4C",
        backgroundColor: "#FFFFFF",
    },
    separator: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E6E8EA",
    },
    separatorText: {
        marginHorizontal: 15,
        color: "#A0A0A0",
        fontSize: 14,
    },
    verifyButton: {
        backgroundColor: "#0D1B4C",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 25,
    },
    verifyButtonDisabled: {
        backgroundColor: "#A0A0A0",
    },
    verifyButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    resendContainer: {
        position: "absolute",
        bottom: 25,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
    },
    resendText: {
        fontSize: 14,
        color: "#444",
    },
    resendLink: {
        fontSize: 14,
        color: "#007BFF",
        fontWeight: "600",
    },
});