import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken'
import {GET_ERRORS, SET_CURRENT_USER} from './types';

export const registerUser = (userData, history) => (dispatch) => {
    axios.post('http://localhost:5000/api/users/register', userData)
      .then(res => history.push('/login'))//have to change path in App.js Route
      .catch((
        err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };

export const loginUser = (userData, history) => (dispatch) => {
    axios.post('http://localhost:5000/api/users/login', userData) //have to change path in App.js Route
      .then(res => {
        const{token} = res.data;
        setAuthToken(token);
        localStorage.setItem('jwtToken', token);//token time
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded))
      })
      .catch((err) => {
        console.log( 'mistake', err )
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };

  export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded
  })

  export const logoutUser = () => (dispatch) => {
    setAuthToken(false);
    dispatch(setCurrentUser({}))
  }