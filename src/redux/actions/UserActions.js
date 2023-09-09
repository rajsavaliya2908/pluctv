import {
    SET_USER_INFO,
    SET_TOKEN,
    SET_FCM_TOKEN,
} from '../types';

export const setUserInfo = value => {
    return async dispatch => {
        dispatch({
            type: SET_USER_INFO,
            payload: value,
        });
    };
};


export const setFcmToken = value => {
    return async dispatch => {
        dispatch({
            type: SET_FCM_TOKEN,
            payload: value,
        });
    };
};


export const setApiToken = value => {
    return async dispatch => {
        dispatch({
            type: SET_TOKEN,
            payload: value,
        });
    };
};

