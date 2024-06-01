import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import LottleAnimation from '../../Components/LottleAnimations';
import {LottleSource} from '../../Assests/source';

const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnBoarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    // <LinearGradient  colors={['#800080', '#0000FF']} height={'100%'}>
    //   <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
    //     <Text style = {{color : 'white', fontSize : 19}}>Food Delivery</Text>
    //   </View>
    // </LinearGradient>

    <LottleAnimation source={LottleSource.Spinner} />
  );
};

export default SplashScreen;
