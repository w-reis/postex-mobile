import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  isWhite?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, isWhite, ...rest }) => (
  <Container isWhite={isWhite} {...rest}>
    <ButtonText isWhite={isWhite}>{children}</ButtonText>
  </Container>
);

export default Button;
