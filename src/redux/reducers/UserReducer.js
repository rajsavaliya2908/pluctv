import {
    SET_USER_INFO,
    SET_TOKEN,
    SET_FCM_TOKEN,
} from '../types';

const INITIAL_STATE = {
    apiToken: '',
    userInfo: '',
    fcmToken: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                apiToken: action.payload,
            };

        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            };

        case SET_FCM_TOKEN:
            return {
                ...state,
                fcmToken: action.payload,
            };

        default:
            return state;
    }
}
