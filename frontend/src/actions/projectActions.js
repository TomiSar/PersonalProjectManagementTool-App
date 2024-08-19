import axios from 'axios';
import { GET_ERRORS } from './types';
import { PROJECT_URL } from '../constants';

export const createProject = (project, navigate) => async (dispatch) => {
  try {
    await axios.post(`${PROJECT_URL}`, project);
    navigate('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
