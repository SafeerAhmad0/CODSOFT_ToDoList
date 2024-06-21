import React, {useEffect} from 'react';
import { Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const OnBoarding = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['lavender', 'lightblue']}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: '#fff',
          fontSize: 35,
        }}>
        ToDoList
      </Text>
    </LinearGradient>
  );
};

export default OnBoarding;
