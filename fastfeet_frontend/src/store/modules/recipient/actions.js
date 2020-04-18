export function create() {
  return {
    type: '@recipient/GO_CREATE',
  };
}
export function createRequest(recipient) {
  return {
    type: '@recipient/CREATE_REQUEST',
    payload: { recipient },
  };
}
export function createSuccess() {
  return {
    type: '@recipient/CREATE_SUCCESS',
  };
}
export function recipientFailure() {
  return {
    type: '@recipient/FAILURE',
  };
}
export function update(recipient) {
  return {
    type: '@recipient/GO_UPDATE',
    payload: { recipient },
  };
}
export function updateRequest(recipient) {
  return {
    type: '@recipient/UPDATE_REQUEST',
    payload: { recipient },
  };
}
export function updateSuccess() {
  return {
    type: '@recipient/UPDATE_SUCCESS',
  };
}
export function back() {
  return {
    type: '@recipient/GO_BACK',
  };
}
