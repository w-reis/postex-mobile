import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignUp: React.FC = () => (
  <KeyboardAvoidingView style={{ flex: 1 }} enabled>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <Container>
        <Title>Cadastro</Title>
        <Input
          name="email"
          placeholder="Endereço de e-mail"
          keyboardType="email-address"
        />
        <Input name="name" placeholder="Seu nome completo" />
        <Input name="password" placeholder="Digite uma senha" secureTextEntry />
        <Input
          name="confirmpassword"
          placeholder="Repita a senha"
          secureTextEntry
        />
        <Button style={{ marginTop: 47 }}>Proximo</Button>
      </Container>
    </ScrollView>
  </KeyboardAvoidingView>
);

export default SignUp;
