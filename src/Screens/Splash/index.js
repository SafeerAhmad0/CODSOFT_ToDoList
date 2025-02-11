import React from 'react';
import LottleAnimation from '../../Components/LottleAnimations';
import {LottleSource} from '../../Assests/source';

const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnBoarding');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LottleAnimation source={LottleSource.Spinner} />
  );
};

export default SplashScreen;
