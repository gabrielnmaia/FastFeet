import styled from 'styled-components/native';

export const PurpleBackground = styled.SafeAreaView`
  background: #7d40e7;
  height: 100px;
`;
export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 20px;
  margin: -80px 20px 0;
`;

export const Form = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  height: 300px;
  border: 1px solid #0000001a;
  border-radius: 4px;
  box-shadow: 2px 2px 1px #0000001a;
  background: #fff;
  padding: 15px;
  font-size: 16px;
  color: #000;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 46px;
  border-radius: 4px;
  margin-top: 20px;
  background: #7d40e7;
  align-items: center;
  justify-content: center;
`;
