import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

interface FormProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: FormProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('Usuário é obrigatório'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [signIn],
  );

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
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              placeholder="Endereço de e-mail"
              keyboardType="email-address"
            />
            <Input
              name="password"
              placeholder="Sua senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
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
