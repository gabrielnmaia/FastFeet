export function deliveryDetails(delivery) {
  return {
    type: '@delivery/DETAILS',
    payload: { delivery },
  };
}
export function deliveryPickupRequest(
  id,
  deliveryman_id,
  start_date,
  navigation,
) {
  return {
    type: '@delivery/PICKUP_REQUEST',
    payload: { id, deliveryman_id, start_date, navigation },
  };
}
export function pickupSuccess() {
  return {
    type: '@delivery/PICKUP_SUCCESS',
  };
}
export function pickupFailure() {
  return {
    type: '@delivery/FAILURE',
  };
}
export function deliveredRequest(id, deliveryman_id, file, navigation) {
  return {
    type: '@delivery/DELIVERED_REQUEST',
    payload: { id, deliveryman_id, file, navigation },
  };
}
export function deliveredSuccess() {
  return {
    type: '@delivery/DELIVERED_SUCCESS',
  };
}
export function deliveredFailure() {
  return {
    type: '@delivery/DELIVERED_FAILURE',
  };
}
export function problemRequest(id, description, navigation) {
  return {
    type: '@delivery/PROBLEM_REQUEST',
    payload: { id, description, navigation },
  };
}
export function problemSuccess() {
  return {
    type: '@delivery/PROBLEM_SUCCESS',
  };
}
export function problemFailure() {
  return {
    type: '@delivery/PROBLEM_FAILURE',
  };
}
