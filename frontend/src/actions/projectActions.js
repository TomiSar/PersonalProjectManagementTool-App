import axios from 'axios';
import { PROJECT_URL } from '../constants';
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT } from './types';

export const createProject = (project, navigate) => async (dispatch) => {
  try {
    await axios.post(`${PROJECT_URL}`, project);
    navigate('/dashboard');
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

export const getProjects = () => async (dispatch) => {
  const res = await axios.get(`${PROJECT_URL}/all`);
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios(`${PROJECT_URL}/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (error) {
    navigate('/dashboard');
  }
};
