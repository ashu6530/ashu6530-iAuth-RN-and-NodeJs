import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitBtn from "./FormSubmitBtn";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";
import { StackActions } from '@react-navigation/native';

const SignupForm = ({navigation}) => {
    
    const validationSchema = Yup.object({
        name:Yup.string().trim().min(3,'Name is too short!').required("Name is required"),
        email: Yup.string().email('Invalid Email').required("Email is required"),
        password:Yup.string().trim().min(8,"Password is too short").required('Password is required'),
        confirmPassword:Yup.string().equals([Yup.ref('password'),null],'Password does not match!')
 })

  const userInfo = { 
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  const signUp = async (value,actions)=>{
    
      console.log(value)
      const res = await client.post('/signup',{
        ...value
     })
     if(res.data.success){
      const signInRes = await client.post('/signin',{email:value.email,password:value.password})
      if(signInRes.data.success){
        navigation.dispatch(
          StackActions.replace('ImageUpload', {
            token:signInRes.data.token
          })
        );
       }
     
     }
     console.log(res.data);
      actions.resetForm();

   }

  return (
    <FormContainer>
      <Formik 
      initialValues = {userInfo} 
      validationSchema={validationSchema} 
      onSubmit={signUp} 
      >
        {({values,errors,touched,handleChange,handleBlur,handleSubmit}) => {
            const {name ,email , password,confirmPassword} = values
          return (
            <>
              <FormInput
                value={name}
                error={touched.name && errors.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur('name')}
                title="Name"
                placeholder="Ashutosh Singh "
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur('email')}
                autoCapitalize="none"
                title="Email"
                placeholder="example@email.com"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur('password')}
                autoCapitalize="none"
                secureTextEntry
                title="Password"
                placeholder="********"
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur('confirmPassword')}
                autoCapitalize="none"
                secureTextEntry
                title="Confirm Password"
                placeholder="********"
              />
              <FormSubmitBtn onPress={handleSubmit} title="Signup" />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default SignupForm;

const styles = StyleSheet.create({});
