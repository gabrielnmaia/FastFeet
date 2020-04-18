export function create() {
  return {
    type: '@deliveryman/GO_CREATE',
  };
}
export function createRequest(deliveryman) {
  return {
    type: '@deliveryman/CREATE_REQUEST',
    payload: { deliveryman },
  };
}
export function createSuccess() {
  return {
    type: '@deliveryman/CREATE_SUCCESS',
  };
}
export function deliverymanFailure() {
  return {
    type: '@deliveryman/FAILURE',
  };
}
export function update(deliveryman) {
  return {
    type: '@deliveryman/GO_UPDATE',
    payload: { deliveryman },
  };
}
export function updateRequest(deliveryman) {
  return {
    type: '@deliveryman/UPDATE_REQUEST',
    payload: { deliveryman },
  };
}
export function updateSuccess() {
  return {
    type: '@deliveryman/UPDATE_SUCCESS',
  };
}
export function back() {
  return {
    type: '@deliveryman/GO_BACK',
  };
}
