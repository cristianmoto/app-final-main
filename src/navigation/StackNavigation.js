
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import LoginScreen from '../screens/LoginScreen'

import SignupScreen from '../screens/SignUpScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
  return (
   
   <GestureHandlerRootView>
        <Stack.Navigator initialRouteName='Login'
        screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' component={LoginScreen}/>
           
            <Stack.Screen name='SignUp' component={SignupScreen}/>
        </Stack.Navigator>
  
        </GestureHandlerRootView>

    
  )
}


export default StackNavigation