import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const loginHome = async () => {
    if (!email || !password) {
      Alert.alert("Completa todos los campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Menu");
    } catch (error) {
      Alert.alert("El correo o contraseña son inválidos.");
      console.log("Firebase error:", error);
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

      <Text style={styles.title}>¡Bienvenido!</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo electrónico"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#A0A0A0"
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={22}
            color="#6E6E6E"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={loginHome}>
        <Text style={styles.loginText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.footerLink}>Créala aquí</Text>
        </TouchableOpacity>
      </View>

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
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 40,
    color: "#0D1B4C",
  },
  input: {
    backgroundColor: "#F3F5F7",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E6E8EA",
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
  },
  passwordInput: {
    fontSize: 15,
    flex: 1,
    marginRight: 10,
  },
  forgotText: {
    color: "#555",
    fontSize: 14,
    textAlign: "right",
    marginTop: 10,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#0D1B4C",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  loginText: {
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
