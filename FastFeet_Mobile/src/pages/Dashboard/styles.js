import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
  padding-top: 20px;
`;

export const Header = styled.View`
  padding-top: 20px;
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
`;

export const InfosContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Infos = styled.View`
  flex-direction: column;
  margin-left: 15px;
`;

export const Avatar = styled.Image`
  height: 68px;
  width: 68px;
  border-radius: 34px;
`;

export const Name = styled.Text`
  color: #444444;
  font-size: 24px;
  font-weight: bold;
  max-width: 200px;
`;

export const Welcome = styled.Text`
  color: #666666;
  font-size: 12px;
  margin-bottom: 5px;
`;

export const LogoutButton = styled.TouchableOpacity`
  justify-content: center;
  margin-right: 10px;
`;

export const Deliveries = styled.View`
  flex-direction: column;
  margin-top: 40px;
`;
export const Title = styled.View`
  justify-content: space-between;
  align-content: center;
  align-items: baseline;
  flex-direction: row;
  height: 50px;
`;

export const Options = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OptionButton = styled(RectButton)`
  flex-direction: row;
  margin-left: 10px;
  color: #999999;
  width: auto;
  height: 20px;
`;

export const DeliveriesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 1,
})`
  height: 80%;
`;

export const Delivery = styled.View`
  border: 1px solid #0000001a;
  border-radius: 4px;
  box-shadow: 2px 2px 1px #0000001a;
  background: #fff;
  margin: 10px 0;
`;

export const DeliveryTitle = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

export const DeliveryDetails = styled.View`
  flex-direction: row;
  margin-top: 5px;
  background: #f8f9fd;
  padding: 25px 20px 25px;
  align-items: flex-end;
  justify-content: space-between;
`;
export const DetailsInfo = styled.View`
  flex-direction: column;
  margin-right: 20px;
`;
export const InfoTitle = styled.Text`
  color: #999999;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 5px;
`;
export const InfoDescription = styled.Text`
  color: #444444;
  font-size: 13px;
  font-weight: bold;
`;

export const DetailsButton = styled(RectButton)``;
