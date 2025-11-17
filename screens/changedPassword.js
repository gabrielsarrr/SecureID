import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChangedPassword({ navigation }) {

    const handleBackToLogin = () => {
        // Redirigir al login
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>

            {/* Icono de éxito */}
            <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle" size={80} color="#34C759" />
            </View>

            {/* Título */}
            <Text style={styles.title}>Contraseña cambiada</Text>

            {/* Mensaje */}
            <Text style={styles.message}>
                Tu contraseña fue cambiada satisfactoriamente.
            </Text>

            {/* Botón para volver al login */}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleBackToLogin}
            >
                <Text style={styles.loginButtonText}>Volver a iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 60,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
        color: "#0D1B4C",
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: "#666",
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
        paddingHorizontal: 20,
    },

    loginButton: {
        backgroundColor: "#0D1B4C",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        width: '100%',
    },
    loginButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});