import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 40px;
  padding: 40px;
`;

export const Avatar = styled.Image`
  height: 136px;
  width: 136px;
  border-radius: 68px;
  margin: 20px 0 60px;
  align-self: center;
`;

export const Label = styled.Text`
  color: #666666;
  font-size: 14px;
  margin-bottom: 5px;
`;
export const Description = styled.Text`
  color: #444444;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #e74040;
`;
