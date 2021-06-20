import axios from 'axios';
import { PROFILE_ERROR, GET_PROFILE } from './types';
import { setAlert } from './alert';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/profile', formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: 'res.data',
      });

      dispatch(
        setAlert(edit ? 'Profile updated' : 'Profile created', 'success')
      );

      if (!edit) history.push('/dashboard');
    } catch (err) {
      const errors = err.response ? err.response.data.errors : null;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
