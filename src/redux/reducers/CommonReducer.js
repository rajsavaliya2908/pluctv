import {
    NO_INTERNET,
    LOADING,
    REFRESH
} from '../types';

const initialState = {
    noInternet: false,
    loading: false,
    refresh: false,
};

export const CommonReducer = (state = initialState, action) => {
    switch (action.type) {

        case NO_INTERNET:
            return {...state, ...{noInternet: action.payload}};

        case LOADING:
            return {...state, ...{loading: action.payload}};

        case REFRESH:
            return {...state, ...{refresh: action.payload}};
    }
    return state;
};
