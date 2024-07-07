import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainNavigator from './app/utils/MainNavigator';
import LoginProvider from './app/context/LoginProvider';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App = () => {
  return (
    <SafeAreaProvider>
      <LoginProvider>
  <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
 </LoginProvider>
    </SafeAreaProvider>
 
 )
}

export default App

const styles = StyleSheet.create({})