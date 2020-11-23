import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

interface FormProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSignIn = useCallback((data: FormProps) => {
    console.log(data);
  }, []);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <Container>
          <Title>Entrar</Title>
          <Form ref={formRef} onSubmit={handleSignIn} style={{ width: '100%' }}>
            <Input
              name="email"
              placeholder="Endereço de e-mail"
              keyboardType="email-address"
            />
            <Input name="password" placeholder="Sua senha" secureTextEntry />
            <Button
              style={{ marginTop: 47 }}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
