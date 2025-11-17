import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Button, Alert, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import appFirebase from "../credenciales";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function ImportantDates({ navigation }) {
    const [dates, setDates] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const fetchDates = async () => {
        if (!auth.currentUser) return;
        const q = query(
            collection(db, "importantDates"),
            where("userId", "==", auth.currentUser.uid)
        );
        const snapshot = await getDocs(q);

        const uniqueDates = [];
        const seen = new Set();
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const key = data.date + "-" + data.title;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueDates.push({ id: doc.id, ...data });
            }
        });

        uniqueDates.sort((a, b) => new Date(a.date) - new Date(b.date));

        setDates(uniqueDates);
    };

    useEffect(() => {
        fetchDates();
    }, []);

    const addDate = async () => {
        if (!title || !date) {
            Alert.alert("Error", "Completa título y selecciona una fecha");
            return;
        }

        await addDoc(collection(db, "importantDates"), {
            userId: auth.currentUser.uid,
            title,
            date: date.toISOString().split("T")[0],
            createdAt: new Date()
        });

        setModalVisible(false);
        setTitle("");
        setDate(new Date());
        fetchDates();
    };

    const deleteDate = async (id) => {
        await deleteDoc(doc(db, "importantDates", id));
        fetchDates();
    };

    // Función para definir color según fecha
    const getBackgroundColor = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Ignorar horas
        const target = new Date(dateStr);
        target.setHours(0, 0, 0, 0);

        const diffDays = (target - today) / (1000 * 60 * 60 * 24);

        if (diffDays < -1) return "#fc6d5aff"; // pasado
        if (diffDays < 0) return "#ffad3bff"; // hoy
        if (diffDays < 2) return "#ffe96fff"; //dos dias
        if (diffDays <= 7) return "#aff36c"; // próxima semana
        return "#9ef6aa"; // futuro
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={28} color="#0D1B4C" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.title}>Fechas importantes</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-circle-outline" size={35} color="#0D1B4C" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                {dates.map(d => (
                    <View
                        key={d.id}
                        style={[styles.dateItem, { backgroundColor: getBackgroundColor(d.date) }]}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View>
                                <Text style={styles.dateTitle}>{d.title}</Text>
                                <Text style={styles.dateText}>{d.date}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteDate(d.id)}>
                                <Ionicons name="trash-outline" size={24} color="#D32F2F" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontWeight: "600", marginBottom: 5 }}>Título</Text>
                        <TextInput
                            placeholder="Ej: Entregar proyecto"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />

                        <Text style={{ fontWeight: "600", marginBottom: 5 }}>Fecha</Text>
                        <TouchableOpacity
                            onPress={() => setShowPicker(true)}
                            style={styles.dateButton}
                        >
                            <Text style={{ fontSize: 16 }}>
                                {date.toISOString().split("T")[0]}
                            </Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="calendar"
                                onChange={(event, selectedDate) => {
                                    setShowPicker(false);
                                    if (selectedDate) setDate(selectedDate);
                                }}
                            />
                        )}

                        <Button title="Agregar" onPress={addDate} />
                        <Button
                            title="Cancelar"
                            color="gray"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 0
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    backButton: {
        marginTop: 60,
        marginBottom: 20,
        marginLeft: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
        color: "#0D1B4C",
    },
    scrollView: {
        flex: 1
    },
    dateItem: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    dateTitle: {
        fontSize: 16,
        fontWeight: "600"
    },
    dateText: {
        fontSize: 14,
        color: "#363636ff",
        fontWeight: 500,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },
    dateButton: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    }
});
