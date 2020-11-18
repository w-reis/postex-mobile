import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const RegisterAddress: React.FC = () => (
  <Container>
    <Title>Seu Endereço</Title>
    <Input name="cep" placeholder="CEP" keyboardType="numeric" />
    <Input name="address" placeholder="Logradouro" />
    <Input name="number" placeholder="Número" keyboardType="numeric" />
    <Input name="complement" placeholder="Complemento" />
    <Input name="neighborhood" placeholder="Bairro" />
    <Input name="city" placeholder="Cidade" />
    <Input name="uf" placeholder="UF" />
    <Button style={{ marginTop: 47 }}>Cadastrar</Button>
  </Container>
);

export default RegisterAddress;
