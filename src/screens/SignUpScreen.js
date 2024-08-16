import { Pressable, Text, View, TextInput, Button, Image, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSignUpMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../slice/AuthSlice";
import { signupSchema } from "../validacion/signupSchema";
import { theme } from "../theme/index";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const [triggerSignUp, result] = useSignUpMutation();

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      );
    }
  }, [result]);

  const onSubmit = () => {
    try {
      setErrorMail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      signupSchema.validateSync({ email, password, confirmPassword })
      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (err) {
      console.log("Entró al signup del error");
      console.log(err.path);
      console.log(err.message);

      if (err.path === "email") {
        setErrorMail(err.message);
      } else if (err.path === "password") {
        setErrorPassword(err.message);
      } else if (err.path === "confirmPassword") {
        setErrorConfirmPassword(err.message);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center relative">
      <Image
        source={require("../assets/images/fondo.jpg")}
        className="absolute inset-0"
        style={{ resizeMode: 'cover' }}
      />
      <SafeAreaView className="flex-1 justify-center items-center w-11/12 rounded-lg py-5">
        <View className="w-full p-5 rounded-lg items-center gap-4">
          <Text className="text-white text-xl">Registrar</Text>
          <TextInput
            className="w-full p-2 border border-gray-400 rounded-md text-white"
            placeholder="Email"
            placeholderTextColor="lightgray"
            value={email}
            onChangeText={setEmail}
          />
          <Text className="text-red-500 text-xs self-start">{errorMail}</Text>
          <TextInput
            className="w-full p-2 border border-gray-400 rounded-md text-white"
            placeholder="Password"
            placeholderTextColor="lightgray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Text className="text-red-500 text-xs self-start">{errorPassword}</Text>
          <TextInput
            className="w-full p-2 border border-gray-400 rounded-md text-white"
            placeholder="Confirmar Password"
            placeholderTextColor="lightgray"
            value={confirmPassword}
            onChangeText={setconfirmPassword}
            secureTextEntry={true}
          />
          <Text className="text-red-500 text-xs self-start">{errorConfirmPassword}</Text>
          <Button onPress={onSubmit} title="Registrar" color={theme.bgWhite(0.3)} />
          <Text className="text-white text-sm">¿Tienes cuenta?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text className="text-blue-500 text-sm">Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
