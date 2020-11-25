import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView, Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

interface FormProps {
  CEP: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

const RegisterAddress: React.FC = () => {
  const route = useRoute();

  const navigation = useNavigation();

  const { personalinfo }: any = route.params;

  const formRef = useRef<FormHandles>(null);

  const handleSignUp = useCallback(
    async (data: FormProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          CEP: Yup.string().required('CEP é obrigatório'),
          address: Yup.string().required('Endereço é obrigatório'),
          neighborhood: Yup.string().required('Bairro é obrigatório'),
          city: Yup.string().required('Cidade é obrigatória'),
          state: Yup.string().required('UF é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        !data.complement && delete data.complement;

        await api.post('/recipients', { ...data, ...personalinfo });

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Agora você pode fazer login no Postex.',
        );

        navigation.navigate('SignIn');
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
    },
    [personalinfo, navigation],
  );
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
              name="CEP"
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
              name="state"
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
