import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import deliveryman from './deliveryman/sagas';
import order from './order/sagas';
import recipient from './recipient/sagas';

export default function* rootSaga() {
  return yield all([auth, deliveryman, order, recipient]);
}
