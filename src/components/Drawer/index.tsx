import React from 'react';

import { Image } from 'react-native';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.png';

import { Header, Title } from './styles';

const Drawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { signOut } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <Header>
        <Image
          source={logo}
          width={120}
          height={135.47}
          style={{ width: 120, height: 135.47 }}
        />
        <Title>v 1.0.0</Title>
      </Header>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={signOut}
        icon={() => <Icon name="sign-out" size={24} color="#0748b4" />}
        labelStyle={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}
      />
    </DrawerContentScrollView>
  );
};

export default Drawer;
