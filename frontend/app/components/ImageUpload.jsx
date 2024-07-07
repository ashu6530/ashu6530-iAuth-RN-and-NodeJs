import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import client from "../api/client";
import { StackActions } from '@react-navigation/native';
import mime from 'mime'
const ImageUpload = ({route,navigation}) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0)
  const {token} = route.params

  const openImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const uploadProfileImage = async () => {
    const newImageUri =  "file:///" + image.split("file:/").join("");

    const formData = new FormData();
    formData.append('avatar', {
     uri : newImageUri,
     type: mime.getType(newImageUri),
     name: newImageUri.split("/").pop()
    });
  
    try {
      const res = await client.post('/upload_profile', formData, {
        headers: {
        Accept:'application/json',
        "Content-Type":'multipart/form-data',
        Authorization: `JWT ${token}`,
        },
        onUploadProgress:({loaded,total})=>setProgress(Math.floor((loaded/total)*100))
      });
      console.log(res.data);
      if(res.data.success){
        navigation.dispatch(
          StackActions.replace('UserProfile')
        );
      }
    } catch (error) {
      console.log('Error uploading image:', error.message);
      // Handle specific error cases here
    }
  };
  
  return (
    <View className="flex-1 justify-center items-center">
      <View>
        <TouchableOpacity
          onPress={openImageLibrary}
          className="h-[180px] w-[180px] rounded-full justify-center items-center border-2 border-dashed border-gray-500 overflow-hidden "
        >
          {image ? (
            <Image
              source={{ uri: image }}
              className="w-full h-full object-cover "
            />
          ) : (
            <Text className="text-2xl text-center font-bold ">
              Upload Profile Image
            </Text>
          )}
        </TouchableOpacity>
        {progress ? <Text className="text-center pt-4 text-xl text-gray-500 uppercase ">{progress}</Text> : null}
        <Text className="text-center pt-4 text-xl text-gray-500 uppercase ">
          Skip
        </Text>
        {image ? (
          <Text
            onPress={uploadProfileImage}
            className="text-center mt-2 p-4 text-xl font-bold uppercase bg-blue-500 rounded-lg "
          >
            Upload
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default ImageUpload;

