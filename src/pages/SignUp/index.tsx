import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

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
  const navigation = useNavigation();

  const handleNextScreen = useCallback(async (data: FormProps) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('Usuário é obrigatório'),
        password: Yup.string().required('Senha é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
        confirmpassword: Yup.string().required('Confirme sua senha!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      navigation.navigate('RegisterAddress', { personalinfo: data });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Ocorreu um erro insperado',
        'Ocorreu um erro ao gravar seus dados, cheque as informações.',
      );
    }
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
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              autoCompleteType="email"
              placeholder="Endereço de e-mail"
              keyboardType="email-address"
            />
            <Input
              name="name"
              placeholder="Seu nome completo"
              autoCapitalize="words"
            />
            <Input
              name="password"
              placeholder="Digite uma senha"
              secureTextEntry
            />
            <Input
              name="confirmpassword"
              placeholder="Repita a senha"
              secureTextEntry
              returnKeyType="next"
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
              Proximo
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
