import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    ALL_USERS_REQUEST,
  } from '../constants/userConstants';
  
  const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Something went wrong');
    return data;
  };
  
  export const loginUser = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_USER_REQUEST });
      const res = await fetch('/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await handleResponse(res);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_USER_FAIL, payload: error.message });
    }
  };
  
  export const registerUser = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const res = await fetch('/api/v1/register', {
        method: 'POST',
        body: userData
      });
      const data = await handleResponse(res);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: REGISTER_USER_FAIL, payload: error.message });
    }
  };
  
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
      const res = await fetch('/api/v1/me');
      const data = await handleResponse(res);
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.message });
    }
  };
  
  export const logoutUser = () => async (dispatch) => {
    try {
      const res = await fetch('/api/v1/logout');
      await handleResponse(res);
      dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_USER_FAIL, payload: error.message });
    }
  };
  
  export const updateProfile = (userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      const res = await fetch('/api/v1/me/update', {
        method: 'PUT',
        body: userData
      });
      const data = await handleResponse(res);
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.message });
    }
  };
  
  export const updatePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const res = await fetch('/api/v1/password/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwords)
      });
      const data = await handleResponse(res);
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.message });
    }
  };
  
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
      const res = await fetch('/api/v1/password/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
      });
      const data = await handleResponse(res);
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.message });
    }
  };
  
  export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const res = await fetch(`/api/v1/password/reset/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwords)
      });
      const data = await handleResponse(res);
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: RESET_PASSWORD_FAIL, payload: error.message });
    }
  };
  
  export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const res = await fetch('/api/v1/admin/users');
      const data = await handleResponse(res);
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.message });
    }
  };
  
  export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const res = await fetch(`/api/v1/admin/user/${id}`);
      const data = await handleResponse(res);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
    }
  };
  
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      const res = await fetch(`/api/v1/admin/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await handleResponse(res);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAIL, payload: error.message });
    }
  };
  
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
      const res = await fetch(`/api/v1/admin/user/${id}`, { method: 'DELETE' });
      const data = await handleResponse(res);
      dispatch({ type: DELETE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_USER_FAIL, payload: error.message });
    }
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  