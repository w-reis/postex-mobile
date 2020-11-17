import React from 'react';
import { TextInputAndroidProps } from 'react-native';

import { Container, MyInput } from './styles';

interface InputProps extends TextInputAndroidProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({ ...rest }) => (
  <Container>
    <MyInput placeholderTextColor="#A8A7A8" {...rest} />
  </Container>
);

export default Input;
