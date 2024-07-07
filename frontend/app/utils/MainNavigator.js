import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppForm from '../../AppForm';
import ImageUpload from '../components/ImageUpload';
import UserProfile from '../components/UserProfile';
import { useLogin } from '../context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';



const Stack = createNativeStackNavigator()

const StackNavigator = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name = 'Home' component={AppForm} />
        <Stack.Screen name = 'ImageUpload' component={ImageUpload} />
        <Stack.Screen name = 'UserProfile' component={UserProfile} />
      </Stack.Navigator>
  )
   
}

const MainNavigator = () => {
  const {isLoggedIn} = useLogin()
  return isLoggedIn ? <DrawerNavigator/> : <StackNavigator/>  
  
}

export default MainNavigator

const styles = StyleSheet.create({})