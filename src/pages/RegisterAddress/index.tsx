import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';
import { TextInput } from '../../components/Input/styles';

interface FormProps {
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
}

const RegisterAddress: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSignUp = useCallback(async (data: FormProps) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        cep: Yup.string().required('CEP é obrigatório'),
        address: Yup.string().required('Endereço é obrigatório'),
        neighborhood: Yup.string().required('Bairro é obrigatório'),
        city: Yup.string().required('Cidade é obrigatória'),
        uf: Yup.string().required('UF é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await signIn({
      //  email: data.user,
      //  password: data.password,
      // });
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
          <Title>Seu Endereço</Title>
          <Form ref={formRef} onSubmit={handleSignUp} style={{ width: '100%' }}>
            <Input
              name="cep"
              placeholder="CEP"
              keyboardType="numeric"
              autoCompleteType="postal-code"
              maxLength={8}
            />
            <Input
              name="address"
              placeholder="Logradouro"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              name="number"
              placeholder="Número"
              keyboardType="numeric"
              maxLength={5}
            />
            <Input
              name="complement"
              placeholder="Complemento"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              name="neighborhood"
              placeholder="Bairro"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              name="city"
              placeholder="Cidade"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <Input
              name="uf"
              placeholder="UF"
              autoCorrect={false}
              autoCapitalize="none"
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
              Cadastrar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterAddress;
