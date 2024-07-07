import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { isValidElement, useState } from "react";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitBtn from "./FormSubmitBtn";
import client from "../api/client";
import { useLogin } from "../context/LoginProvider";
import { StackActions } from '@react-navigation/native';


const LoginForm = ({navigation}) => {
  const {setProfile,setIsLoggedIn} = useLogin()


  const isValidObj=(obj)=>{
    return Object.values(obj).every(value=>value.trim())
 
   } 
   const isValidEmail = (value) =>{
    const regx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regx.test(value)
   }

  const [userInfo, setUserInfo] = useState({
    email:"",
    password:"",
   
  })
  const {email,password,mobile} = userInfo

  const [error, setError] = useState("")
 

  const handleChangeText=(value,fieldName)=>{
    setUserInfo({...userInfo,[fieldName]:value})
}

  const updateError=(error,stateUpdater)=>{
    stateUpdater(error)
    setTimeout(()=>{
      stateUpdater('')
    },2500)

  }

  const isValidForm=()=>{
    
    if(!isValidObj(userInfo)) return updateError('Invalid field',setError)
    if(!isValidEmail(email))  return updateError('Invalid Email',setError)
    if(!password.trim() || password.length<8) return updateError ("Inavlid Password",setError) 
    return true  
  }

  const submitForm= async ()=>{
    if(isValidForm()){
      const res = await  client.post("/signin",{
        ...userInfo
    
      })
    if(res.data.success){
      
      setUserInfo({email:" ",password:" "})
      setProfile(res.data.user)
      setIsLoggedIn(true)
      navigation.dispatch(
        StackActions.replace('UserProfile')
      );
    }   
      console.log(res.data.user);
      
    }
  }
  return (
    <FormContainer>
      {error ? <Text className="bg-red-500 text-xl font-bold text-center">{error}</Text>:null}
      <FormInput
      value={email} 
      onChangeText={(value)=>handleChangeText(value,"email")}
      title="Email" 
      placeholder="example@email.com" 
      autoCapitalize="none"
      />
      <FormInput 
      value={password}
      onChangeText={(value)=>handleChangeText(value,"password")}
      title="Password" 
      placeholder="********" 
      autoCapitalize="none"
      secureTextEntry
      />

      <FormSubmitBtn onPress={submitForm} title="Login" />
    </FormContainer>
  );
};

export default LoginForm;

const styles = StyleSheet.create({});
