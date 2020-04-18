import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { createSuccess, deliverymanFailure, updateSuccess } from './actions';

export function create() {
  history.push('/deliverymen/manage');
}

export function* createDeliverymanRequest({ payload }) {
  try {
    yield call(api.post, 'deliverymen', payload.deliveryman);
    toast.success('Perfil criado com sucesso!');
    yield put(createSuccess());
  } catch (err) {
    toast.error('Erro ao criar o perfil, confira seus dados!');
    yield put(deliverymanFailure());
  }
}

export function createDeliverymanSuccess() {
  history.push('/deliverymen');
}

export function update() {
  history.push('/deliverymen/manage');
}

export function* updateDeliverymanRequest({ payload }) {
  try {
    const { id, name, email, avatar_id } = payload.deliveryman;
    yield call(api.put, `deliverymen/${id}`, {
      name,
      email,
      avatar_id,
    });
    toast.success('Perfil atualizado com sucesso!');
    yield put(updateSuccess());
  } catch (err) {
    toast.error('Erro ao atualizar o perfil, confira seus dados!');
    yield put(deliverymanFailure());
  }
}

export function updateDeliverymanSuccess() {
  history.push('/deliverymen');
}

export function back() {
  history.push('/deliverymen');
}

export default all([
  takeLatest('@deliveryman/GO_CREATE', create),
  takeLatest('@deliveryman/CREATE_REQUEST', createDeliverymanRequest),
  takeLatest('@deliveryman/CREATE_SUCCESS', createDeliverymanSuccess),
  takeLatest('@deliveryman/GO_UPDATE', update),
  takeLatest('@deliveryman/UPDATE_REQUEST', updateDeliverymanRequest),
  takeLatest('@deliveryman/UPDATE_SUCCESS', updateDeliverymanSuccess),
  takeLatest('@deliveryman/GO_BACK', back),
]);
