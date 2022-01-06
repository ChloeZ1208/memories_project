import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({type: AUTH, data: data})
    navigate('/');
  } catch (error) {
    console.log(error.message);
    console.log(error.response); // to see more detailed error message
  }
}

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(formData);
    dispatch({type: AUTH, data: data})
    navigate('/');  
  } catch (error) {
    console.log(error.message);
  }
}