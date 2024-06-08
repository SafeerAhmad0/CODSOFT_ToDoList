import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const OnBoarding = ({navigation}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ToDoList</Text>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
