import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/Screens/Splash';
import OnBoarding from './src/Screens/OnBoarding';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SplashScreen} options={{headerShown : false}}/>
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
