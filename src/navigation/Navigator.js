import { StyleSheet, Text,View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import BottomTapNavigator from "./BottomTapNavigator";
import StackNavigation from './StackNavigation'
import { useDispatch, useSelector } from "react-redux";
import { useDB } from "../hooks/useDB";
import { setUser } from "../slice/AuthSlice";

const Navigator = () =>{
    const dispatch = useDispatch()
    const {user} =useSelector ((state) => state.auth.value)
    const {getSession} = useDB ()

    useEffect(()=>{
    (async () =>{
        try {
            const response = await getSession ();
            if (response){
                const user = response;
                dispatch(
                    setUser ({
                        email: user.email,
                        localId: user.localId,
                        idToken: user.token,
                    })
                );
            }
        }catch (error) {
            console.log(error);
        }
    })();
    });
    return(
        <NavigationContainer>
            {user ? <BottomTapNavigator/> : <StackNavigation/>}
        </NavigationContainer>
    )
}
export default Navigator

const styles = StyleSheet.create({})