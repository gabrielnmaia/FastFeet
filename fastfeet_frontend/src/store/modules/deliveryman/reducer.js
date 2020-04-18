import produce from 'immer';

const INITIAL_STATE = {
  deliveryman: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryman/GO_CREATE': {
        draft.deliveryman = null;
        break;
      }
      case '@deliveryman/GO_UPDATE': {
        draft.deliveryman = action.payload.deliveryman;
        break;
      }
      case '@deliveryman/GO_BACK': {
        draft.deliveryman = null;
        break;
      }
      default:
        return state;
    }
  });
}
