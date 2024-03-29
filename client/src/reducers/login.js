const DEFAULT_STATE = {
    "username": "",
    "loggedIn": false,
    "token": null
};

const loginReducer = (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case 'LOGIN':
            return state;
        case 'LOGIN_SUCCESS':
            return {
                state,
                ...action.payload
            };
        case 'LOGIN_ERROR':
        case 'LOGOUT':
            return DEFAULT_STATE;
        default:
            return state;
    }
};

export default loginReducer;
