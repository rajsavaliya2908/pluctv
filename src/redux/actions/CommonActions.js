import {
    NO_INTERNET,
    LOADING,
    ALERT,
    REFRESH
} from '../types';


export const setNoInternet = value => {
    return async dispatch => {
        dispatch({
            type: NO_INTERNET,
            payload: value,
        });
    };
};
export const setLoading = value => {
    return async dispatch => {
        dispatch({
            type: LOADING,
            payload: value,
        });
    };
};

export const setAlert = value => {
    return async dispatch => {
        dispatch({
            type: ALERT,
            payload: value,
        });
    };
};

export const setRefresh = value => {
    return async dispatch => {
        dispatch({
            type: REFRESH,
            payload: value,
        });
    };
};
