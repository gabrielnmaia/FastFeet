import produce from 'immer';

const INITIAL_STATE = {
  order: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@order/GO_CREATE': {
        draft.order = null;
        break;
      }
      case '@order/GO_UPDATE': {
        draft.order = action.payload.order;
        break;
      }
      case '@order/GO_BACK': {
        draft.order = null;
        break;
      }
      default:
        return state;
    }
  });
}
