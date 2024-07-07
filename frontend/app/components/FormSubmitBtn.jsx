import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const FormSubmitBtn = ({title,onPress}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    className="bg-slate-900 h-12 rounded-lg justify-center items-center">
        <Text className="text-center text-white text-2xl">{title}</Text>
    </TouchableOpacity>
  )
}

export default FormSubmitBtn

const styles = StyleSheet.create({})