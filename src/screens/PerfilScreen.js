import {    View,    Text,    SafeAreaView,    Image,    Pressable,    Platform  } from "react-native";
  import { useDispatch, useSelector } from "react-redux";
  import { useGetProfileimageQuery } from "../../../services/perfilService";
  import { clearUser } from "../AuthSlice";
  import { useDB } from "../../../hooks/useDB";
  import { StatusBar } from "expo-status-bar";
  
  const MyProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { truncateSessionTable } = useDB();
    const { imageCamera, localId } = useSelector((state) => state.auth.value);
    const { data: imageFromBase } = useGetProfileimageQuery(localId);
  
    const launchCamera = () => {
      navigation.navigate("ImageSelector");
    };
  
    const signOut = async () => {
      try {
        if (Platform.OS !== "web") await truncateSessionTable();
        dispatch(clearUser());
      } catch (error) {
        console.log({ errorSignOutDB: error });
      }
    };
  
    return (
      <View className="flex-1 relative">
        <StatusBar style="light" />
        <Image
          source={require("../assets/images/fondo.jpg")}
          className="h-full w-full absolute"
          resizeMode="cover"
        />
  
        <SafeAreaView className="flex-1 mb-10">
          <View className="mx-4 my-8 relative z-50">
            <View className="items-center">
              {imageFromBase || imageCamera ? (
                <Image
                  source={{ uri: imageFromBase?.image || imageCamera }}
                  className="h-[150px] w-[150px] rounded-full mb-5"
                  resizeMode="cover"
                />
              ) : (
                <Image
                  className="h-[150px] w-[150px] rounded-full mb-5"
                  
                  source={require("../assets/user.png")}
                />
              )}
            </View>
  
            <Pressable
              onPress={launchCamera}
              className="mt-2 bg-white/20 w-4/5 justify-center items-center py-2 rounded-full mx-auto"
            >
              <Text className="text-white text-base">
                {imageFromBase || imageCamera
                  ? "Modificar foto"
                  : "Agregar foto"}
              </Text>
            </Pressable>
  
            <Pressable
              onPress={signOut}
              className="mt-2 bg-white/20 w-4/5 justify-center items-center py-2 rounded-full mx-auto"
            >
              <Text className="text-white text-base">Cerrar Sesion</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    );
  };
  
  export default MyProfile;
  