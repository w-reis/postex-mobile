import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Menu from '../../components/Menu';

import { Container, Title } from './styles';

interface FormProps {
  id?: number;
  name?: string;
  email?: string;
  CEP: string;
  address: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

const EditAddress: React.FC = () => {
  const [address, setAddress] = useState<FormProps>({} as FormProps);
  const [loading, setLoading] = useState(false);

  const { recipient, token } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const loadRecipientInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`recipients/${recipient.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddress(response.data);
    } finally {
      setLoading(false);
    }
  }, [recipient.id, token]);

  const updateRecipient = useCallback(
    async (data: Omit<FormProps, 'id'>, id: string) => {
      await api.put(`recipients/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    [token],
  );

  const handleSumit = useCallback(
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
        !data.number && delete data.number;

        updateRecipient(data, recipient.id);

        Alert.alert(
          'Cadastro editado com sucesso!',
          'Seu endereço foi atualido.',
        );
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
    [recipient.id, updateRecipient],
  );

  useEffect(() => {
    loadRecipientInfo();
  }, [loadRecipientInfo]);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#0748b4" />
        </View>
      ) : (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled>
          <Menu />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <Container>
              <Title>Meu Endereço</Title>
              <Form
                ref={formRef}
                onSubmit={handleSumit}
                style={{ width: '100%' }}
                initialData={address}
              >
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
                  maxLength={2}
                  autoCorrect={false}
                  autoCapitalize="characters"
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
                  Editar
                </Button>
              </Form>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default EditAddress;
