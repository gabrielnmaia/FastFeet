import React from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO, addMinutes } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { deliveryPickupRequest } from '~/store/modules/delivery/actions';

import Background from '~/components/Background';
import {
  PurpleBackground,
  Container,
  DeliveryInfo,
  Actions,
  Title,
  DetailsInfo,
  InfoDescription,
  InfoTitle,
  DateInfo,
  ActionButton,
} from './styles';

const status_map = {
  0: 'Pendente',
  1: 'Retirada',
  2: 'Entregue',
};

export default function Details({ navigation }) {
  const delivery = useSelector((state) => state.delivery.delivery);
  const dispatch = useDispatch();

  async function handlePickup(id, deliveryman_id, start_date) {
    await dispatch(
      deliveryPickupRequest(id, deliveryman_id, start_date, navigation),
    );
  }

  return (
    <>
      <PurpleBackground />
      <Background>
        <Container>
          <DeliveryInfo>
            <Title>
              <Icon name="local-shipping" color="#7D40E7" size={24} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#7D40E7',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Informações do pedido
              </Text>
            </Title>
            <DetailsInfo>
              <InfoTitle>DESTINATÁRIO</InfoTitle>
              <InfoDescription>{delivery.recipient.name}</InfoDescription>
            </DetailsInfo>
            <DetailsInfo>
              <InfoTitle>ENDEREÇO DE ENTREGA</InfoTitle>
              <InfoDescription>{`${delivery.recipient.address_name}, ${delivery.recipient.address_number}
${delivery.recipient.address_cep}
${delivery.recipient.address_city} - ${delivery.recipient.address_state}`}</InfoDescription>
            </DetailsInfo>
            <DetailsInfo>
              <InfoTitle>PRODUTO</InfoTitle>
              <InfoDescription>{delivery.product}</InfoDescription>
            </DetailsInfo>
          </DeliveryInfo>
          <DeliveryInfo style={{ marginTop: 30 }}>
            <Title>
              <Icon name="event" color="#7D40E7" size={24} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#7D40E7',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                Situação da entrega
              </Text>
            </Title>
            <DetailsInfo>
              <InfoTitle>STATUS</InfoTitle>
              <InfoDescription>{status_map[delivery.status]}</InfoDescription>
            </DetailsInfo>
            <DateInfo>
              <DetailsInfo>
                <InfoTitle>DATA DE RETIRADA</InfoTitle>
                <InfoDescription>
                  {delivery.start_date
                    ? format(parseISO(delivery.start_date), 'dd/MM/yyyy', {
                        locale: pt,
                      })
                    : '--/--/----'}
                </InfoDescription>
              </DetailsInfo>
              <DetailsInfo>
                <InfoTitle>DATA DE ENTREGA</InfoTitle>
                <InfoDescription>
                  {' '}
                  {delivery.end_date
                    ? format(parseISO(delivery.end_date), 'dd/MM/yyyy', {
                        locale: pt,
                      })
                    : '--/--/----'}
                </InfoDescription>
              </DetailsInfo>
            </DateInfo>
          </DeliveryInfo>
          <Actions>
            <ActionButton
              style={{ borderRightWidth: 0.5, borderRightColor: '#0000001a' }}
              onPress={() => navigation.navigate('ReportProblem')}
              disabled={delivery.status === 2}
            >
              <Icon name="highlight-off" color="#E74040" size={24} />
              <Text style={{ marginVertical: 2, color: '#999999' }}>
                Informar
              </Text>
              <Text style={{ color: '#999999' }}>Problema</Text>
            </ActionButton>
            <ActionButton
              style={{ borderRightWidth: 0.5, borderRightColor: '#0000001a' }}
              onPress={() => navigation.navigate('ListProblem')}
            >
              <Icon name="info-outline" color="#E7BA40" size={24} />
              <Text style={{ marginVertical: 2, color: '#999999' }}>
                Visualizar
              </Text>
              <Text style={{ color: '#999999' }}>Problemas</Text>
            </ActionButton>
            {delivery.status === 0 ? (
              <ActionButton
                onPress={() =>
                  handlePickup(
                    delivery.id,
                    delivery.deliveryman_id,
                    addMinutes(new Date(), 1),
                  )
                }
              >
                <Icon name="play-circle-outline" color="#7D40E7" size={24} />
                <Text style={{ marginVertical: 2, color: '#999999' }}>
                  Confirmar
                </Text>
                <Text style={{ color: '#999999' }}>Retirada</Text>
              </ActionButton>
            ) : (
              <ActionButton
                onPress={() => navigation.navigate('Confirm')}
                disabled={delivery.status === 2}
              >
                <MCIcon name="check-circle-outline" color="#7D40E7" size={24} />
                <Text style={{ marginVertical: 2, color: '#999999' }}>
                  {delivery.status === 2 ? 'Produto' : 'Confirmar'}
                </Text>
                <Text style={{ color: '#999999' }}>
                  {delivery.status === 2 ? 'Entregue' : 'Entrega'}
                </Text>
              </ActionButton>
            )}
          </Actions>
        </Container>
      </Background>
    </>
  );
}
