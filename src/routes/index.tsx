import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import RegisterAddress from '../pages/RegisterAddress';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FAFBFD' },
      }}
    >
      <Auth.Screen name="Home" component={Home} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="RegisterAddress" component={RegisterAddress} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
