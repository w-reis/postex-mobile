import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Text } from 'react-native';
import Dashboard from '../pages/Dashboard';
import Drawer from '../components/Drawer';

const App = createDrawerNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <Drawer {...props} />}
    >
      <App.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: () => <Icon name="home" size={24} color="#0748b4" />,
          drawerLabel: ({ color }) => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                color,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
