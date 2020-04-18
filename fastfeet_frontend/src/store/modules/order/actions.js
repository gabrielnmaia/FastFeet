export function create() {
  return {
    type: '@order/GO_CREATE',
  };
}
export function createRequest(order) {
  return {
    type: '@order/CREATE_REQUEST',
    payload: { order },
  };
}
export function createSuccess() {
  return {
    type: '@order/CREATE_SUCCESS',
  };
}
export function orderFailure() {
  return {
    type: '@order/FAILURE',
  };
}
export function update(order) {
  return {
    type: '@order/GO_UPDATE',
    payload: { order },
  };
}
export function updateRequest(order) {
  return {
    type: '@order/UPDATE_REQUEST',
    payload: { order },
  };
}
export function updateSuccess() {
  return {
    type: '@order/UPDATE_SUCCESS',
  };
}
export function back() {
  return {
    type: '@order/GO_BACK',
  };
}
