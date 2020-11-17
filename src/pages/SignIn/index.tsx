import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Title>Entrar</Title>
    <Input placeholder="Endereço de e-mail" keyboardType="email-address" />
    <Input placeholder="Sua senha" secureTextEntry />
    <Button style={{ marginTop: 47 }}>Entrar</Button>
  </Container>
);

export default SignIn;
