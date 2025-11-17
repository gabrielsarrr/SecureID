import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Notifications({ navigation }) {

    // son simuladas, hay que hacer un useradmin y que mande las notis a todos
    const notifications = [
        { id: 1, title: "Actualización disponible", message: "Se ha lanzado la nueva versión de la app." },
        { id: 2, title: "Recordatorio", message: "No olvides completar tu perfil." },
        { id: 3, title: "Mensaje", message: "Tu solicitud ha sido aprobada." },
        { id: 4, title: "Reunión pendiente", message: "Reunión programada para el 15 de diciembre de 2025" },
    ];

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={28} color="#0D1B4C" />
            </TouchableOpacity>

            <Text style={styles.title}>Notificaciones</Text>

            <ScrollView style={styles.scrollView}>
                {notifications.map((item) => (
                    <View key={item.id} style={styles.notificationItem}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text style={styles.notificationMessage}>{item.message}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
        color: "#0D1B4C",
    },
    scrollView: {
        flex: 1,
    },
    notificationItem: {
        backgroundColor: "#F3F5F7",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E6E8EA",
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        color: "#0D1B4C",
    },
    notificationMessage: {
        fontSize: 14,
        color: "#555",
    },
});
