import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const FormContainer = ({children}) => {
  return (
    <KeyboardAvoidingView  className="p-4 w-screen">
    {children}
  </KeyboardAvoidingView>
  )
}

export default FormContainer

const styles = StyleSheet.create({})