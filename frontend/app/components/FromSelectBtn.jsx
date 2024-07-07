import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
const FromSelectBtn = ({backgroundColor,title,onPress}) => {
    
   return (
    <TouchableWithoutFeedback onPress={onPress}>
          <View style={{backgroundColor}} className="flex-1 items-center justify-center p-2 rounded-sm" >
            <Text className="text-xl font-bold text-white">{title}</Text>
          </View>
        </TouchableWithoutFeedback>
  )
}

export default FromSelectBtn

const styles = StyleSheet.create({
   
})