import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register';
import RegisterPersonal from './screens/registerPersonal';
import RegisterBiometrics from './screens/registerBiometrics';
import ForgotPassword from './screens/forgotPassword';
import SecurityCode from './screens/securityCode';
import NewPassword from './screens/newPassword';
import ChangedPassword from './screens/changedPassword'
import Menu from './screens/menu'
import ContactUs from './screens/contactUs'
import Notifications from './screens/notifications'
import ImportantDates from './screens/importantDates';
import MenuChangePassword from './screens/menuChangePassword';
import PhoneNumber from './screens/phoneNumber'


  const Stack = createStackNavigator();


export default function App() {
  function MyStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Home}/>
        <Stack.Screen
          name="Login"
          component={Login}/>
        <Stack.Screen
          name="Register"
          component={Register} />
        <Stack.Screen
          name='RegisterPersonal'
          component={RegisterPersonal}/>
        <Stack.Screen
          name='RegisterBiometrics'
          component={RegisterBiometrics}/>
        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}/> 
        <Stack.Screen
          name='SecurityCode'
          component={SecurityCode} />
        <Stack.Screen
          name='NewPassword'
          component={NewPassword}/>
          <Stack.Screen
          name='ChangedPassword'
          component={ChangedPassword}/>
          <Stack.Screen
          name='Menu'
          component={Menu}/>
          <Stack.Screen
          name='ContactUs'
          component={ContactUs}/>
          <Stack.Screen
          name='Notifications'
          component={Notifications}/>
          <Stack.Screen
          name='ImportantDates'
          component={ImportantDates}/>
          <Stack.Screen
          name='MenuChangePassword'
          component={MenuChangePassword}/>
          <Stack.Screen
          name='PhoneNumber'
          component={PhoneNumber}/>
          
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}
