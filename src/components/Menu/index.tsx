import React, { useCallback } from 'react';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Entypo';

import { Container, Hamburger } from './styles';

const Menu: React.FC = () => {
  const navigation = useNavigation();
  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }, [navigation]);
  return (
    <Container>
      <Hamburger onPress={openDrawer} style={{ margin: 14, width: 36 }}>
        <Icon name="menu" size={36} color="#0748b4" />
      </Hamburger>
    </Container>
  );
};

export default Menu;
