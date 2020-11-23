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
  name: string;
  confirpassword: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleNextScreen = useCallback((data: FormProps) => {
    console.log(data);
  }, []);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <Container>
          <Title>Cadastro</Title>
          <Form
            ref={formRef}
            onSubmit={handleNextScreen}
            style={{ width: '100%' }}
          >
            <Input
              name="email"
              placeholder="Endereço de e-mail"
              keyboardType="email-address"
            />
            <Input name="name" placeholder="Seu nome completo" />
            <Input
              name="password"
              placeholder="Digite uma senha"
              secureTextEntry
            />
            <Input
              name="confirmpassword"
              placeholder="Repita a senha"
              secureTextEntry
            />
            <Button
              style={{ marginTop: 47 }}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Proximo
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
