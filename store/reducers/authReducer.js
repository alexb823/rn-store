import { AUTHENTICATE } from '../actions/authActions';

const initialState = {
  token: null,
  userId: null,
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { token: action.token, userId: action.userId };
    default:
      return state;
  }
};
