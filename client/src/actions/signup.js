import * as actionTypes from '../actionTypes/signup';
import {get, post, del} from '../utils/api';

export function signup(name, email, password) {

    return async dispatch => {

        dispatch({
            type: actionTypes.SIGNUP
        });

        try {
            const result = await post('/api/v1/rest-auth/registration/', {
                name: name,
                email: email,
                password1: password,
                password2: password
            });

            dispatch({
                type: actionTypes.SIGNUP_SUCCESS,
                data: {
                    "password": password,
                    "name": name,
                    "email": email,
                    "show_loader": false,
                    "error": false
                }
            });
        } catch (e) {
            dispatch({
                type: actionTypes.SIGNUP_ERROR,
                data: {
                    "password": password,
                    "name": name,
                    "email": email,
                    "show_loader": false,
                    "error": true
                }
            });
        }
    }
}
