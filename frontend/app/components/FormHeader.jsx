import { StyleSheet, Text, View, Animated } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const FormHeader = ({leftHeading,rightHeading,subHeading}) => {
  return (
    <SafeAreaView>
    <View className="pt-40">
    <View className="flex-row justify-center ">
    <Animated.Text className="text-4xl font-extrabold ">{leftHeading}</Animated.Text>
    <Animated.Text className="text-4xl font-extrabold pl-2">{rightHeading}</Animated.Text>
   </View>
   <Text className="text-xl text-center">{subHeading}</Text>
   </View>
    
    

  </SafeAreaView>
  )
}

export default FormHeader

const styles = StyleSheet.create({})