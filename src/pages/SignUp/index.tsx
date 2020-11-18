import React from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Title>Cadastro</Title>
    <Input
      name="email"
      placeholder="Endereço de e-mail"
      keyboardType="email-address"
    />
    <Input name="name" placeholder="Seu nome completo" />
    <Input name="password" placeholder="Digite uma senha" secureTextEntry />
    <Input
      name="confirmpassword"
      placeholder="Repita a senha"
      secureTextEntry
    />
    <Button style={{ marginTop: 47 }}>Proximo</Button>
  </Container>
);

export default SignUp;
