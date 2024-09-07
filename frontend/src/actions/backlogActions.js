import axios from 'axios';
import { BACKLOG_URL } from '../constants';
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK } from './types';

export const addProjectTask =
  (backlogId, projectTask, navigate) => async (dispatch) => {
    try {
      await axios.post(`${BACKLOG_URL}/${backlogId}`, projectTask);
      navigate(`/projectBoard/${backlogId}`);
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

export const getBacklog = (backlogId) => async (dispatch) => {
  try {
    const res = await axios.get(`${BACKLOG_URL}/${backlogId}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjectTask =
  (backlogId, projectTaskId, navigate) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${BACKLOG_URL}/${backlogId}/${projectTaskId}`
      );
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data,
      });
    } catch (err) {
      navigate('/dashboard');
    }
  };

export const updateProjectTask =
  (backlogId, projectTaskId, projectTask, navigate) => async (dispatch) => {
    try {
      await axios.patch(
        `${BACKLOG_URL}/${backlogId}/${projectTaskId}`,
        projectTask
      );
      navigate(`/projectBoard/${backlogId}`);
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
