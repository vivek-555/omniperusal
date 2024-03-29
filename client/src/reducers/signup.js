const DEFAULT_STATE = {
    "username": "",
    "password": "",
    "name": "",
    "email": "",
    "show_loader": false,
    "error": false
};

const signupReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SIGNUP':
            return {
                "name": "",
                "email": "",
                "show_loader": true,
                "error": false
            };
        case 'SIGNUP_SUCCESS':
            return {
                "email": action.data.email,
                "name": action.data.name,
                "show_loader": false,
                "error": false
            };
        case 'SIGNUP_ERROR':
            return {
                "email": "",
                "name": "",
                "show_loader": false,
                "error": true
            };

        default:
            return state;
    }
};

export default signupReducer;
