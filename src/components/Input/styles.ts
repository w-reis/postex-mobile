import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  border-bottom-color: #29292c;
  border-bottom-width: 1px;
  margin: 10px 0;

  ${(props) =>
    props.isErrored &&
    !props.isFocused &&
    !props.isFilled &&
    css`
      border-width: 1px;
      border-color: #c53030;
      border-bottom-color: #c53030;
      border-radius: 8px;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: #0162ab;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: 'Roboto-';
  font-size: 20px;
  color: #0162ab;
`;
