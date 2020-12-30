import {
    USER_LOADING,
    SET_CURRENT_USER,
    GET_ERRORS,
    CLEAR_ERRORS
} from './types'
import setAuthToken from '../utils/setAuthToken'

import jwt_decode from 'jwt-decode'
import axios from 'axios'


export const registerUser = (userData, history) => dispatch => {
    console.log(userData)
    axios
        .post('/api/users/register', userData)
        .then(res => {
            dispatch({ type: CLEAR_ERRORS })
            history.push('/login')
        })
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data

            localStorage.setItem('jwtToken', token)
            setAuthToken(token)

            const decoded = jwt_decode(token)

            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch({ type: GET_ERRORS, payload: err.response.data })
        })
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

// User loading
export const setUserLoading = () => {
    return { type: USER_LOADING }
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken")

  // Remove auth header for future requests
  setAuthToken(false)

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))

};