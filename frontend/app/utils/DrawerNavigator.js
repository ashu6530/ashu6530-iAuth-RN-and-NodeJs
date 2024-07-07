import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Home from "../components/Home";
import Tasks from "../components/Tasks";
import { useLogin } from "../context/LoginProvider";


const Drawer = createDrawerNavigator();
const CustomDrawer = (props) => {

 const {setIsLoggedIn,profile} = useLogin() 
  return (
    <View className="flex-1">
      <DrawerContentScrollView {...props}>
        <View className="flex-row justify-between mx-2 ">
          <View>
            <Text>{profile.name}</Text>
            <Text>{profile.email}</Text>
          </View>
          <Image
            className="w-20 h-20 rounded-full"
            source={{
              uri:`${profile.avatar}`,
            }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity 
      onPress={()=>{setIsLoggedIn(false)}}
      className="bg-black p-2 absolute bottom-16 left-16 ">
        <Text className="font-bold text-xl text-white">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigators = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Tasks" component={Tasks} />
    </Drawer.Navigator>
  );
};

const DrawerNavigator = () => {
  return <DrawerNavigators />;
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
