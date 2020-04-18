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

export const DeliveryInfo = styled.View`
  border: 1px solid #0000001a;
  border-radius: 4px;
  box-shadow: 2px 2px 1px #0000001a;
  background: #fff;
  padding: 15px;
`;
export const Title = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const DetailsInfo = styled.View`
  flex-direction: column;
  margin-bottom: 15px;
`;
export const InfoTitle = styled.Text`
  color: #999999;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 7px;
`;
export const InfoDescription = styled.Text`
  color: #666666;
  font-size: 15px;
`;
export const DateInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background: #f8f9fd;
  border-radius: 4px;
  margin-top: 30px;
  box-shadow: 2px 2px 1px #0000001a;
`;

export const ActionButton = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 15px 10px;
`;
