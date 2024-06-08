import * as React from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {svgFiles} from '../../Assests/source';
import CurrentTask from '../CurrentTasks';
import Tasks from '../Tasks';
import {heightRatio, widthRatio} from '../../Components/screenSize';
import AntDesign from '../../Components/VectorIcons';

const Tab = createBottomTabNavigator();

const dataSet = {
  Icon: svgFiles,
};

export default function HomePage() {
  const CustomTabBar = ({state, descriptors, navigation}) => {
    return (
      <View style={{backgroundColor : 'lightblue',height : heightRatio(8)}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: widthRatio(75),
            height : heightRatio(8),
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              {
                navigation.navigate('CurrentTask');
              }
            }}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              width: widthRatio(12),
              alignItems: 'center',
            }}>
            <AntDesign nameIcon={'home'} />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              {
                navigation.navigate('Tasks');
              }
            }}
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              width: widthRatio(19),
              alignItems: 'center',
            }}>
            <AntDesign nameIcon={'plus'} />
            <Text>Add Tasks</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="CurrentTask"
        component={CurrentTask}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
