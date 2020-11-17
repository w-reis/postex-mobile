import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
  isWhite?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, isWhite, ...rest }) => (
  <Container isWhite={isWhite} {...rest}>
    <ButtonText isWhite={isWhite}>{children}</ButtonText>
  </Container>
);

export default Button;
