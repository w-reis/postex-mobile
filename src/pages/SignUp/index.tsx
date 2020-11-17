import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Title>Cadastro</Title>
    <Input placeholder="Endereço de e-mail" keyboardType="email-address" />
    <Input placeholder="Seu nome completo" />
    <Input placeholder="Digite uma senha" secureTextEntry />
    <Input placeholder="Repita a senha" secureTextEntry />
    <Button style={{ marginTop: 47 }}>Proximo</Button>
  </Container>
);

export default SignUp;
