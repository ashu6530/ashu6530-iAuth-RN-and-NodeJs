import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const FormInput = (props) => {
  const {title,error} = props
  return (
    <>
    <View className="flex-row justify-between">
       <Text className="text-lg mb-2">{title}</Text>
       {error ? <Text className="text-red-500 text-lg mb-2">{error}</Text>: null}

    </View>
      
      <TextInput
        {...props}
        className="border border-black rounded-md p-2 w-full mb-8 "
       
      />
    </>
  )
}

export default FormInput

const styles = StyleSheet.create({})