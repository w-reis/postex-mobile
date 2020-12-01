import styled, { css } from 'styled-components/native';

interface ResumeCardProps {
  color?: '#2c2929' | string;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Username = styled.Text`
  color: #2c2929;
  font-family: 'Roboto-Bold';
  font-size: 36px;
  margin-bottom: 20px;
`;

export const Subtitle = styled.Text`
  color: #2c2929;
  font-family: 'Roboto-Medium';
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

export const Card = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #eef0f2;
  border-radius: 24px;
  padding: 25px;
  margin-top: 20px;
`;

export const CardText = styled.Text`
  color: #2c2929;
  font-family: 'Roboto-Medium';
  font-size: 24px;
  margin-bottom: 8px;
`;

export const CardSubtitle = styled.Text`
  color: #2c2929;
  font-family: 'Roboto-Regular';
  font-size: 14px;
`;

export const ResumeCard = styled.View<ResumeCardProps>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  margin-top: 20px;
  border-left-width: 3px;

  ${(props) =>
    props.color &&
    css`
      border-left-color: ${props.color};
    `}
`;

export const ResumeCardText = styled.Text<ResumeCardProps>`
  font-family: 'Roboto-Medium';
  font-size: 18px;
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `};
`;
