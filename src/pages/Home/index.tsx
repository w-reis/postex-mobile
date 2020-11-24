import React from 'react';

import { Image, KeyboardAvoidingView, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import Button from '../../components/Button';

import { Container, Title } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <Container>
          <Image source={logoImg} width={256} />

          <Title>Consulte suas correspondências</Title>
          <Button onPress={() => navigation.navigate('SignIn')}>Login</Button>
          <Button
            onPress={() => navigation.navigate('SignUp')}
            isWhite
            style={{
              shadowColor: 'rgba(78, 79, 114, 0.08)',
              shadowOffset: {
                width: 16,
                height: 29,
              },
              shadowOpacity: 0.01,
              shadowRadius: 60,

              elevation: 8,
            }}
          >
            Cadastre-se
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
