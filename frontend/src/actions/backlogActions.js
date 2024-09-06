import axios from 'axios';
import { BACKLOG_URL } from '../constants';
import { GET_ERRORS, GET_BACKLOG } from './types';

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
