import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { createSuccess, orderFailure, updateSuccess } from './actions';

export function create() {
  history.push('/order/manage');
}

export function* createOrderRequest({ payload }) {
  try {
    yield call(api.post, 'orders', payload.order);
    toast.success('Encomenda criado com sucesso!');
    yield put(createSuccess());
  } catch (err) {
    toast.error('Erro ao criar a encomenda, confira seus dados!');
    yield put(orderFailure());
  }
}

export function createorderSuccess() {
  history.push('/order');
}

export function update() {
  history.push('/order/manage');
}

export function* updateOrderRequest({ payload }) {
  try {
    const { id, deliveryman_id, recipient_id, product } = payload.order;
    yield call(api.put, `orders/${id}`, {
      deliveryman_id,
      recipient_id,
      product,
    });
    toast.success('Encomenda atualizada com sucesso!');
    yield put(updateSuccess());
  } catch (err) {
    toast.error('Erro ao atualizar a encomenda, confira seus dados!');
    yield put(orderFailure());
  }
}

export function updateOrderSuccess() {
  history.push('/order');
}

export function back() {
  history.push('/order');
}

export default all([
  takeLatest('@order/GO_CREATE', create),
  takeLatest('@order/CREATE_REQUEST', createOrderRequest),
  takeLatest('@order/CREATE_SUCCESS', createorderSuccess),
  takeLatest('@order/GO_UPDATE', update),
  takeLatest('@order/UPDATE_REQUEST', updateOrderRequest),
  takeLatest('@order/UPDATE_SUCCESS', updateOrderSuccess),
  takeLatest('@order/GO_BACK', back),
]);
