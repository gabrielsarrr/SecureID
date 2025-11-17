import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'

export default function home({navigation}) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/image/logo/logo.jpg')} style={styles.logo} />
            <Text style={styles.title}>Secure<Text style={styles.titleBlue}>ID</Text></Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Crear cuenta</Text>
                </TouchableOpacity>
        </View>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 50,
        alignItems: 'center',
    },

    logo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 0,
        marginTop: 0,
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 20,
        marginTop: -55,
    },

    titleBlue: {
        color: '#2a7abf',
        fontWeight: '800',
    },

    buttonsContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
    },

    loginButton: {
        backgroundColor: '#0D1B4C',
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        marginBottom: 15,
    },

    loginText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },

    registerButton: {
        borderWidth: 1,
        borderColor: '#0D1B4C',
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
    },

    registerText: {
        color: '#0D1B4C',
        textAlign: 'center',
        fontSize: 16,
    },
});
