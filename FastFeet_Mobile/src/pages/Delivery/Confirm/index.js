import React, { useState } from 'react';
import { Alert, ActivityIndicator, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { deliveredRequest } from '~/store/modules/delivery/actions';
import {
  Container,
  ConfirmDeliveryContainer,
  CameraContainer,
  ContainerPicture,
  Picture,
  ActionButton,
  SendButton,
} from './styles';

export default function Confirm({ navigation }) {
  const [camera, setCamera] = useState();
  const [image, setImage] = useState();
  const delivery = useSelector((state) => state.delivery.delivery);
  const loading = useSelector((state) => state.delivery.loading);
  const dispatch = useDispatch();

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    }
  };
  const handleEndDelivery = () => {
    const data = new FormData();

    data.append('file', {
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
      name: image.split('/')[9],
    });

    dispatch(
      deliveredRequest(delivery.id, delivery.deliveryman_id, data, navigation),
    );
  };
  return (
    <Container>
      <ConfirmDeliveryContainer>
        {image ? (
          <ContainerPicture>
            <Picture source={{ uri: image }}>
              {!delivery.file ? (
                <ActionButton onPress={() => setImage(null)}>
                  <Icon name="autorenew" color="#7d40e7" size={40} />
                </ActionButton>
              ) : null}
            </Picture>
            {!delivery.file ? (
              <SendButton onPress={handleEndDelivery}>
                {loading ? (
                  <ActivityIndicator size={22} color="#fff" />
                ) : (
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    Enviar
                  </Text>
                )}
              </SendButton>
            ) : null}
          </ContainerPicture>
        ) : (
          <CameraContainer
            ref={(ref) => {
              setCamera(ref);
            }}
            captureAudio={false}
            type={CameraContainer.Constants.Type.back}
            flashMode={CameraContainer.Constants.FlashMode.off}
            autoFocus={CameraContainer.Constants.AutoFocus.on}
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a câmera',
              message: 'Nós precisamos de sua permissão para usar a câmera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {}}
          >
            <ActionButton onPress={takePicture}>
              <Icon name="camera" color="#7d40e7" size={50} />
            </ActionButton>
          </CameraContainer>
        )}
      </ConfirmDeliveryContainer>
    </Container>
  );
}
