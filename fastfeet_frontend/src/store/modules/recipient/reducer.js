import produce from 'immer';

const INITIAL_STATE = {
  recipient: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipient/GO_CREATE': {
        draft.recipient = null;
        break;
      }
      case '@recipient/GO_UPDATE': {
        draft.recipient = action.payload.recipient;
        break;
      }
      case '@recipient/GO_BACK': {
        draft.recipient = null;
        break;
      }
      default:
        return state;
    }
  });
}
