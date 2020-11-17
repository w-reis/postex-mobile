import React from 'react';

import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';

import { Container, Title } from './styles';

const Home: React.FC = () => (
  <Container>
    <Image source={logoImg} width={256} />

    <Title>Consulte suas correspondências.</Title>
  </Container>
);

export default Home;
