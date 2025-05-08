export const LOADING_STATE = 'LOADING_STATE';
export const USER_PERMISSION = 'USER_PERMISSION';

const initial_state = {
    loadingState: false,
    permission:null,
}

const AuthReducers = (state = initial_state, action) => {
    switch (action.type) {
        case LOADING_STATE:
            return {
                ...state,
                loadingState: action.payload,
            };
            case USER_PERMISSION:
                return {
                    ...state,
                    permission: action.payload,
                };
        default:
            return state;
    }
};


export default AuthReducers;
