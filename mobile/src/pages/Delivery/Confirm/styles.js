import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { RNCamera } from 'react-native-camera';

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const ConfirmDeliveryContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ContainerPicture = styled(RectButton)`
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
`;
export const PictureContainer = styled.View`
  width: 90%;
  height: 100%;
`;
export const SendButton = styled(RectButton)`
  top: 8px;
  align-self: stretch;
  height: 45px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background: #7d40e7;
`;

export const ActionButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;
export const Picture = styled.ImageBackground`
  width: 100%;
  height: 80%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 40px;
`;

export const CameraContainer = styled(RNCamera)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;
