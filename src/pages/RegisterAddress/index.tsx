import React, { useCallback, useRef } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

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
  const handleSignUp = useCallback((data: FormProps) => {
    console.log(data);
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
            <Input name="cep" placeholder="CEP" keyboardType="numeric" />
            <Input name="address" placeholder="Logradouro" />
            <Input name="number" placeholder="Número" keyboardType="numeric" />
            <Input name="complement" placeholder="Complemento" />
            <Input name="neighborhood" placeholder="Bairro" />
            <Input name="city" placeholder="Cidade" />
            <Input name="uf" placeholder="UF" />
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
