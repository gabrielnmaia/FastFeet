import produce from 'immer';

const INITIAL_STATE = {
  delivery: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@delivery/DETAILS': {
        draft.delivery = action.payload.delivery;
        break;
      }
      case '@delivery/DELIVERED_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@delivery/DELIVERED_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@delivery/DELIVERED_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
        return state;
    }
  });
}
