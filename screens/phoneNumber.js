import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import appFirebase from "../credenciales";
import { Ionicons } from '@expo/vector-icons';

export default function PhoneNumber({ navigation, route }) {
    const db = getFirestore(appFirebase);
    const auth = getAuth(appFirebase);
    const { currentPhone, onPhoneUpdated } = route.params || {};

    const [phone, setPhone] = useState(currentPhone || "");

    const handleSave = async () => {
        if (!phone) {
            Alert.alert("Error", "Introduce un número de teléfono válido");
            return;
        }

        try {
            const user = auth.currentUser;
            const ref = doc(db, "usuarios", user.uid);
            await updateDoc(ref, { telefono: phone });

            if (onPhoneUpdated) onPhoneUpdated(phone);

            navigation.goBack();
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "No se pudo actualizar el teléfono");
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
            <Text style={styles.title}>Número de teléfono</Text>
            <TextInput
                style={styles.input}
                placeholder="+54 11 1234-5678"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar</Text>
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
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: 10,
        marginBottom: 20,
        color: "#0D1B4C",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: "#0D1B4C",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
