import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS } from './types';
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

export const getProjects = () => async (dispatch) => {
  const res = await axios.get(`${PROJECT_URL}/all`);
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};
