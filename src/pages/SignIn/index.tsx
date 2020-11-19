import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignIn: React.FC = () => (
  <KeyboardAvoidingView style={{ flex: 1 }} enabled>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <Container>
        <Title>Entrar</Title>
        <Input
          name="email"
          placeholder="Endereço de e-mail"
          keyboardType="email-address"
        />
        <Input name="password" placeholder="Sua senha" secureTextEntry />
        <Button style={{ marginTop: 47 }}>Entrar</Button>
      </Container>
    </ScrollView>
  </KeyboardAvoidingView>
);

export default SignIn;
