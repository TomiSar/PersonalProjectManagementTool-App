import axios from 'axios';
import { GET_ERRORS } from './types';

export const createProject = (project, navigate) => async (dispatch) => {
  try {
    await axios.post('http://localhost:8080/api/project', project);
    navigate('/dashboard'); // Use the passed navigate function to redirect
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
