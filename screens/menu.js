import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import appFirebase from "../credenciales";

export default function ProfileScreen({ navigation }) {
    const auth = getAuth(appFirebase);
    const db = getFirestore(appFirebase);

    const [userData, setUserData] = useState(null);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [controllersEnabled, setControllersEnabled] = useState(true);
    const [importantEnabled, setImportantEnabled] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const user = auth.currentUser;

            if (!user) return;

            const ref = doc(db, "usuarios", user.uid);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                setUserData(snap.data());
            }
        };

        loadUser();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigation.replace("Login");
            })
            .catch(error => {
                Alert.alert("Error", "No se pudo cerrar sesión.");
                console.log(error);
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

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.userInfoSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {userData
                                ? `${userData.nombre.charAt(0)}${userData.apellido.charAt(0)}`
                                : "??"}
                        </Text>
                    </View>
                    <Text style={styles.userName}>
                        {userData ? `${userData.nombre} ${userData.apellido}` : "Cargando..."}
                    </Text>
                    <Text style={styles.userEmail}>
                        {userData ? userData.email : ""}
                    </Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.menuItem}>
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                                <Ionicons name="person-outline" size={20} color="#1976D2" />
                            </View>
                            <View style={styles.menuText}>
                                <Text style={styles.menuTitle}>Cargo</Text>
                                <Text style={styles.menuSubtitle}>Alumno</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("Notifications")}
                    >
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: '#F3F5F5' }]}>
                                <Ionicons name="notifications-outline" size={20} color="#7B1FA2" />
                            </View>
                            <View style={styles.menuText}>
                                <Text style={styles.menuTitle}>Notificaciones</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("ContactUs")}
                    >
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: '#E8F5E8' }]}>
                                <Ionicons name="chatbubble-ellipses-outline" size={20} color="#388E3C" />
                            </View>
                            <View style={styles.menuText}>
                                <Text style={styles.menuTitle}>Contactarse</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("ImportantDates")}
                    >
                        <View style={styles.menuItemLeft}>
                            <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                                <Ionicons name="calendar-outline" size={20} color="#F57C00" />
                            </View>
                            <View style={styles.menuText}>
                                <Text style={styles.menuTitle}>Fechas importantes</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Contraseña como botón */}
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigation.navigate("MenuChangePassword")}
                >
                    <View style={styles.menuItemLeft}>
                        <View style={[styles.iconContainer, { backgroundColor: '#FFEBEE' }]}>
                            <Ionicons name="lock-closed-outline" size={20} color="#D32F2F" />
                        </View>
                        <View style={styles.menuText}>
                            <Text style={styles.menuTitle}>Contraseña</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
{/* Teléfono */}
<TouchableOpacity
    style={styles.menuItem}
    onPress={() =>
        navigation.navigate("PhoneNumber", {
            currentPhone: userData?.telefono,
            onPhoneUpdated: (newPhone) => setUserData({ ...userData, telefono: newPhone })
        })
    }
>
    <View style={styles.menuItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: '#E0F2F1' }]}>
            <Ionicons name="call-outline" size={20} color="#00796B" />
        </View>
        <View style={styles.menuText}>
            <Text style={styles.menuTitle}>Teléfono</Text>
            {userData?.telefono ? (
                <Text style={styles.menuSubtitle}>{userData.telefono}</Text>
            ) : (
                <Text style={styles.menuSubtitle}>Sin número</Text>
            )}
        </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#666" />
</TouchableOpacity>


                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <View style={styles.menuItemLeft}>
                        <View style={[styles.iconContainer, { backgroundColor: '#FFEBEE' }]}>
                            <Ionicons name="log-out-outline" size={20} color="#D32F2F" />
                        </View>
                        <View style={styles.menuText}>
                            <Text style={[styles.menuTitle, styles.logoutText]}>Cerrar sesión</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.bottomSpace} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    backButton: {
        paddingHorizontal: 25,
        paddingTop: 60,
        paddingBottom: 10,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 25,
    },
    userInfoSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#0D1B4C',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0D1B4C',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
    },
    section: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        marginBottom: 20,
        paddingVertical: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuText: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    logoutButton: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom: 30,
    },
    logoutText: {
        color: '#D32F2F',
    },
    bottomSpace: {
        height: 20,
    },
});
