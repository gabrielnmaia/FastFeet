import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { createSuccess, recipientFailure, updateSuccess } from './actions';

export function create() {
  history.push('/recipient/manage');
}

export function* createRecipientRequest({ payload }) {
  try {
    yield call(api.post, 'recipients', payload.recipient);
    toast.success('Perfil criado com sucesso!');
    yield put(createSuccess());
  } catch (err) {
    toast.error('Erro ao criar o perfil, confira seus dados!');
    yield put(recipientFailure());
  }
}

export function createRecipientSuccess() {
  history.push('/recipient');
}

export function update() {
  history.push('/recipient/manage');
}

export function* updateRecipientRequest({ payload }) {
  try {
    const { id, ...rest } = payload.recipient;

    yield call(api.put, `recipients/${id}`, rest);
    toast.success('Perfil atualizado com sucesso!');
    yield put(updateSuccess());
  } catch (err) {
    toast.error('Erro ao atualizar o perfil, confira seus dados!');
    yield put(recipientFailure());
  }
}

export function updateRecipientSuccess() {
  history.push('/recipient');
}

export function back() {
  history.push('/recipient');
}

export default all([
  takeLatest('@recipient/GO_CREATE', create),
  takeLatest('@recipient/CREATE_REQUEST', createRecipientRequest),
  takeLatest('@recipient/CREATE_SUCCESS', createRecipientSuccess),
  takeLatest('@recipient/GO_UPDATE', update),
  takeLatest('@recipient/UPDATE_REQUEST', updateRecipientRequest),
  takeLatest('@recipient/UPDATE_SUCCESS', updateRecipientSuccess),
  takeLatest('@recipient/GO_BACK', back),
]);
