import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "../screens/PerfilScreen";
import ImageSelector from "../screens/ImageSelector";



const Stack = createNativeStackNavigator()

const PerfilNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="perfil"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="perfil" component={MyProfile} />
      <Stack.Screen name="ImageSelector" component={ImageSelector} />
     
    </Stack.Navigator>
  );
}

export default  PerfilNavigation