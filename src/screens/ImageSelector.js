import { Text, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setCameraImage } from '../PerfilSlice';
import { useGetProfileimageQuery, usePostProfileImageMutation } from '../../../services/perfilService';
import AddButton from '../../../components/addButton';

const ImageSelector = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isImageFromCamera, setIsImageFromCamera] = useState(false);

  const dispatch = useDispatch();
  const [triggerPostImage] = usePostProfileImageMutation();
  const { localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase } = useGetProfileimageQuery(localId);

  const pickLibraryImage = async () => {
    try {
      setIsImageFromCamera(false);
      const permissionGallery = await verifyGalleryPermissions();
      if (permissionGallery) {
        const result = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          allowsEditing: true,
          aspect: [1, 1],
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.2,
        });

        if (!result.canceled) {
          const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
          setImage(image);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyGalleryPermissions = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return granted;
  };

  const verifyCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermission();
    setIsImageFromCamera(true);
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.2,
      });

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    }
  };

  const confirmImage = async () => {
    try {
      dispatch(setCameraImage(image));
      await triggerPostImage({ image, localId });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center ">
     <Image
        source={require("../assets/images/fondo.jpg")}
        className="h-full w-full absolute"
      />
      <View>
      {image || imageFromBase ? (
        <>
          <Image
            className="my-4 h-48 w-48 rounded-full"
            resizeMode="cover"
            source={{ uri: image || imageFromBase?.image }}
          />
          <AddButton title="Sacar foto" onPress={pickImage} />
          <AddButton title="Galeria" onPress={pickLibraryImage} />
          <AddButton title="Aceptar" onPress={confirmImage} />
        </>
      ) : (
        <>
          <View className="my-4 h-48 w-48 border border-gray-300 rounded-full items-center justify-center bg-white">
            <Text className="text-gray-500">Sin foto</Text>
          </View >
          <View className="my-4  items-center justify-center">
             <AddButton title="Sacar foto" onPress={pickImage} />
          <AddButton title="Galeria" onPress={pickLibraryImage} />
          </View>
         
        </>
      )}
    </View> 
    </View>
  );
};

export default ImageSelector;
