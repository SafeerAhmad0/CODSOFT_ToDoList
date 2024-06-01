import * as React from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import SplashScreen from './src/Screens/Splash';
import OnBoarding from './src/Screens/OnBoarding';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {svgFiles} from './src/Assests/source';

const Tab = createBottomTabNavigator();

const dataSet = {
  'Icon' : svgFiles,
};

export default function App() {
  const CustomTabBar = ({state, descriptors, navigation}) => {
    return (
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <TouchableOpacity>
          <Text>Hi</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Hi</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="SplashScreen" component={SplashScreen} />
        <Tab.Screen name="OnBoarding" component={OnBoarding} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
