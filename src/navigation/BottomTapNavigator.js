import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobeAltIcon, CalendarDaysIcon} from 'react-native-heroicons/solid';
import {UserIcon} from 'react-native-heroicons/solid'
import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import AlertScreen from '../screens/AlertScreen';
import PerfilNavigation from './perfilStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const BottomTapNavigator = () => {
  return (
    <GestureHandlerRootView>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 1,
            position: 'absolute',
            elevation: 0,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Clima"
          options={{
            tabBarIcon: ({ color, size }) => (
              <GlobeAltIcon size={size} color={color} />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Pronostico"
          options={{
            tabBarIcon: ({ color, size }) => (
              <CalendarDaysIcon size={size} color={color} />
            ),
          }}
          component={AlertScreen}
        />
        <Tab.Screen
          name="Perfil"
          options={{
            tabBarIcon: ({ color, size }) => (
              <UserIcon size={size} color={color} />
            ),
          }}
          component={PerfilNavigation}
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default BottomTapNavigator;
