import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import StepIndicator from 'react-native-step-indicator';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';
import { deliveryDetails } from '~/store/modules/delivery/actions';
import Background from '~/components/Background';

import {
  Container,
  Header,
  InfosContainer,
  Infos,
  Avatar,
  Name,
  Welcome,
  LogoutButton,
  Deliveries,
  Title,
  Options,
  OptionButton,
  DeliveriesList,
  Delivery,
  DeliveryTitle,
  DeliveryDetails,
  DetailsInfo,
  InfoTitle,
  InfoDescription,
  DetailsButton,
} from './styles';

const thirdIndicatorStyles = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize: 10,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 1,
  stepStrokeCurrentColor: '#7D40E7',
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: '#7D40E7',
  stepStrokeUnFinishedColor: '#7D40E7',
  separatorFinishedColor: '#7D40E7',
  separatorUnFinishedColor: '#7D40E7',
  stepIndicatorFinishedColor: '#7D40E7',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#7D40E7',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 9,
  currentStepLabelColor: '#999999',
};

export default function Dashboard({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const isFocused = useIsFocused();

  function calculateStatus(delivery) {
    if (delivery.end_date !== null) {
      return 2;
    }
    if (delivery.start_date !== null) {
      return 1;
    }
    return 0;
  }

  async function loadDeliveries() {
    setLoading(true);
    let res;

    if (page === 1) {
      res = await api.get(`/deliveryman/${user.id}/open`);
    } else {
      res = await api.get(`/deliveryman/${user.id}/closed`);
    }

    const data = res.data.map((delivery) => ({
      ...delivery,
      status: calculateStatus(delivery),
    }));

    setDeliveries(data);
    setLoading(false);
  }

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    if (isFocused) {
      loadDeliveries();
    }
  }, [isFocused, page]);

  function handleDetails(delivery) {
    dispatch(deliveryDetails(delivery));
    navigation.navigate('DeliveryDetails', { delivery });
  }

  return (
    <Background>
      <Container>
        <Header>
          <InfosContainer>
            <Avatar
              source={{
                uri: user.file
                  ? user.file.url
                  : `https://api.adorable.io/avatars/50/${user.name}.png`,
              }}
            />
            <Infos>
              <Welcome>Bem vindo de volta,</Welcome>
              <Name>{user.name}</Name>
            </Infos>
          </InfosContainer>
          <LogoutButton onPress={handleLogout}>
            <Icon name="exit-to-app" color="#E74040" size={26} />
          </LogoutButton>
        </Header>
        <Deliveries>
          <Title>
            <Name>Entregas</Name>
            <Options>
              <OptionButton onPress={() => setPage(1)}>
                <Text
                  style={
                    page === 1
                      ? {
                          color: '#7D40E7',
                          fontWeight: 'bold',
                          textDecorationLine: 'underline',
                        }
                      : { color: '#999999' }
                  }
                >
                  Pendentes
                </Text>
              </OptionButton>
              <OptionButton onPress={() => setPage(2)}>
                <Text
                  style={
                    page === 2
                      ? {
                          color: '#7D40E7',
                          fontWeight: 'bold',
                          textDecorationLine: 'underline',
                        }
                      : { color: '#999999' }
                  }
                >
                  Entregues
                </Text>
              </OptionButton>
            </Options>
          </Title>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#7D40E7"
              style={{ marginTop: 100 }}
            />
          ) : (
            <DeliveriesList
              data={deliveries}
              ketExtractor={(delivery) => String(delivery.id)}
              renderItem={({ item: delivery }) => (
                <Delivery>
                  <DeliveryTitle>
                    <Icon name="local-shipping" color="#7D40E7" size={24} />
                    <Text
                      style={{
                        marginLeft: 10,
                        color: '#7D40E7',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}
                    >
                      Pedido {delivery.id}
                    </Text>
                  </DeliveryTitle>
                  <View style={{ marginVertical: 15 }}>
                    <StepIndicator
                      stepCount={3}
                      customStyles={thirdIndicatorStyles}
                      currentPosition={delivery.status}
                      labels={['Aguardando Retirada', 'Retirada', 'Entregue']}
                    />
                  </View>
                  <DeliveryDetails>
                    <DetailsInfo>
                      <InfoTitle>Data</InfoTitle>
                      <InfoDescription>
                        {format(parseISO(delivery.createdAt), 'dd/MM/yyyy', {
                          locale: pt,
                        })}
                      </InfoDescription>
                    </DetailsInfo>
                    <DetailsInfo>
                      <InfoTitle>Cidade</InfoTitle>
                      <InfoDescription>
                        {delivery.recipient.address_city}
                      </InfoDescription>
                    </DetailsInfo>
                    <DetailsButton onPress={() => handleDetails(delivery)}>
                      <Text style={{ color: '#7D40E7', fontWeight: 'bold' }}>
                        Ver detalhes
                      </Text>
                    </DetailsButton>
                  </DeliveryDetails>
                </Delivery>
              )}
            />
          )}
        </Deliveries>
      </Container>
    </Background>
  );
}
