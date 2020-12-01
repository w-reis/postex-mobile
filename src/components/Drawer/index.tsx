import React, { useCallback } from 'react';

import { Image, Alert } from 'react-native';

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
import api from '../../services/api';

const Drawer: React.FC<DrawerContentComponentProps> = (props) => {
  const { signOut, recipient, token } = useAuth();

  const deleteAcount = useCallback(async () => {
    Alert.alert(
      'Tem certeza?',
      'Ao deletar sua conta, todas as correspondências vinculadas a ela serão perdidas.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          style: 'default',
          onPress: async () => {
            try {
              await api.delete(`/recipients/?id=${recipient.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              signOut();
            } catch (error) {
              Alert.alert(
                'Erro ao deletar',
                'Ocorreu um erro ao deletar a conta.',
              );
            }
          },
        },
      ],
    );
  }, [recipient.id, token, signOut]);

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
      <DrawerItem
        label="Deletar conta"
        onPress={deleteAcount}
        icon={() => (
          <Icon name="exclamation-circle" size={24} color="#c53030" />
        )}
        labelStyle={{
          fontSize: 18,
          fontFamily: 'Roboto-Medium',
          color: '#c53030',
        }}
      />
    </DrawerContentScrollView>
  );
};

export default Drawer;
