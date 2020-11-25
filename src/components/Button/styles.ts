import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
  isWhite?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  height: 60px;
  background: #0748b4;
  border-radius: 24px;

  justify-content: center;
  align-items: center;

  margin-bottom: 16px;

  ${(props) =>
    props.isWhite &&
    css`
      background: #ffffff;
    `}
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-family: 'Roboto-Bold';
  color: #ffffff;
  font-size: 20px;

  ${(props) =>
    props.isWhite &&
    css`
      color: #0748b4;
    `}
`;
