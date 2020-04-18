import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import {
  pickupSuccess,
  pickupFailure,
  problemSuccess,
  problemFailure,
  deliveredSuccess,
  deliveredFailure,
} from './actions';

export function* pickup({ payload }) {
  try {
    const { id, deliveryman_id, start_date, navigation } = payload;

    const res = yield call(
      api.put,
      `/deliveryman/${deliveryman_id}/deliveries/${id}`,
      { start_date },
    );

    yield put(pickupSuccess(res.data));
    Alert.alert('Sucesso', 'Pedido retirado com sucesso');
    navigation.navigate('Delivery');
  } catch (err) {
    Alert.alert('Falha na atualização', 'Houve um erro na atualização');
    yield put(pickupFailure());
  }
}
export function* problem({ payload }) {
  try {
    const { id, description, navigation } = payload;

    const res = yield call(api.post, `/delivery/${id}/problems`, {
      description,
    });

    yield put(problemSuccess(res.data));
    Alert.alert('Sucesso', 'Problema relatado com sucesso');
    navigation.navigate('DeliveryDetails');
  } catch (err) {
    Alert.alert('Falha na atualização', 'Houve um erro na atualização');
    yield put(problemFailure());
  }
}

export function* delivered({ payload }) {
  try {
    const { id, deliveryman_id, file, navigation } = payload;

    const res = yield call(api.post, 'files', file);
    yield call(api.put, `/deliveryman/${deliveryman_id}/deliveries/${id}`, {
      end_date: new Date(),
      signature_id: res.data.id,
    });

    Alert.alert('Sucesso', 'Pedido finalizado com sucesso');
    navigation.navigate('Delivery');
    yield put(deliveredSuccess());
  } catch (err) {
    Alert.alert('Erro', 'Ocorreu um erro ao enviar a foto, tente novamente!');
    yield put(deliveredFailure());
  }
}

export default all([
  takeLatest('@delivery/PICKUP_REQUEST', pickup),
  takeLatest('@delivery/PROBLEM_REQUEST', problem),
  takeLatest('@delivery/DELIVERED_REQUEST', delivered),
]);
