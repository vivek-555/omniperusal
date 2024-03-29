import * as actionTypes from '../actionTypes/login';
import {get, post, del} from '../utils/api';

export function login(email, password) {
    return async dispatch => {

        dispatch({
            type: actionTypes.LOGIN
        });

        try {
            const result = await post('/api/v1/rest-auth/login/', {
                email: email,
                password: password
            });

            const token = result.key;

            handleSuccessfulLogin(dispatch, token, email);
        }
        catch(e) {
            dispatch({
                type: actionTypes.LOGIN_ERROR
            });
        }
    }
}

export function facebookLogin(response = {}) {
    return async dispatch => {

        dispatch({
            type: actionTypes.LOGIN
        });

        let {accessToken, email} = response;

        try {
            const result = await post('/api/v1/rest-auth/facebook/', {
                access_token: accessToken,
            });

            const token = result.key;

            handleSuccessfulLogin(dispatch, token, email);
        }
        catch(e) {
            dispatch({
                type: actionTypes.LOGIN_ERROR
            });
        }
    }
}

export function googleLogin(response = {}) {
    return async dispatch => {

        dispatch({
            type: actionTypes.LOGIN
        });

        let {accessToken, profileObj = {}} = response;

        try {
            const result = await post('/api/v1/rest-auth/google/', {
                access_token: accessToken,
            });

            const token = result.key;

            handleSuccessfulLogin(dispatch, token, profileObj.email);
        }
        catch(e) {
            dispatch({
                type: actionTypes.LOGIN_ERROR
            });
        }
    }
}

async function handleSuccessfulLogin(dispatch, authToken, email) {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("email", email);

    let userDetails;

    try {
        userDetails = await get('/api/v1/rest-auth/user/');
    }
    catch(e) {
        console.log('User details could not be fetched');
        userDetails = {};
    }

    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            email: email,
            token: authToken,
            userDetails: userDetails,
            loggedIn: true
        }
    });
}

export function logout() {
    return async dispatch => {
        try {
            const result = await post('/api/v1/rest-auth/logout/');

            localStorage.removeItem('authToken');
            localStorage.removeItem('email');

            dispatch({
                type: actionTypes.LOGOUT
            });
        }
        catch(e) {
            dispatch({
                type: actionTypes.LOGOUT_ERROR
            });
        }
    }
}