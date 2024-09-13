import axios from 'axios';
import { PROJECT_URL } from '../constants';
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from './types';

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

export const deleteProject = (id) => async (dispatch) => {
  if (
    window.confirm(
      `Are you sure you want to permanently delete project ${id} and all it's related Project Task data?`
    )
  ) {
    await axios.delete(`${PROJECT_URL}/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
  }
};
