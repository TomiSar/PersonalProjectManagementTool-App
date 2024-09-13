import axios from 'axios';
import { USERS_URL } from '../constants';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import { jwtDecode } from 'jwt-decode';
import { setJwtToken } from '../utils/helpers';

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

export const login = (loginRequest) => async (dispatch) => {
  try {
    // Login Request (POST)
    // Extract token from res.data and store the token in the localStorage
    // Set token in header ***, decode token on React
    // dispatch to our securityReducer
    const res = await axios.post(`${USERS_URL}/login`, loginRequest);
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    setJwtToken(token);
    const decodedToken = jwtDecode(token);

    dispatch({
      type: SET_CURRENT_USER,
      payload: decodedToken,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response ? err.response.data : 'Server Error',
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('jwtToken');
  setJwtToken(false);

  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
  window.location.href = '/';
};
