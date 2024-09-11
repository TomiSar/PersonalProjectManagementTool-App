import axios from 'axios';
import { USERS_URL } from '../constants';
import { GET_ERRORS } from './types';

export const createNewUser = (newUser, navigate) => async (dispatch) => {
  try {
    await axios.post(`${USERS_URL}/register`, newUser);
    navigate('/login');
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
