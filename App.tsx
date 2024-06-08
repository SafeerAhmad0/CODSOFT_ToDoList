import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from './src/Screens/OnBoarding';
import HomePage from './src/Screens/Home';
import SplashScreen from './src/Screens/Splash';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown : false}}/>
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown : false}}/>
        <Stack.Screen name="Home" component={HomePage} options={{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
































