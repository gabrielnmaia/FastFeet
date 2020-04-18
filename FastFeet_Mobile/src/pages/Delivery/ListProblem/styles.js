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

export const Title = styled.Text`
  color: #000;
  align-self: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ProblemsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 1,
})`
  height: 80%;
`;

export const Problem = styled.View`
  flex-direction: row;
  margin-top: 20px;
  border: 1px solid #0000001a;
  border-radius: 4px;
  box-shadow: 2px 2px 1px #0000001a;
  background: #fff;
  height: 100px;
  justify-content: space-between;
  padding: 20px;
`;
