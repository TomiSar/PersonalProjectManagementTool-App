import { GET_USER, SET_CURRENT_USER } from '../actions/types';

const initialState = {
  validToken: false,
  user: {},
};

export default function securityReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: Boolean(action.payload),
        user: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        validToken: Boolean(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
}
