import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

// all Action Types
import {SET_USER_LOGOUT} from '../types';

// All Reducers
import {CommonReducer} from './CommonReducer';
import UserReducer from './UserReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};



const AppReducers = combineReducers({
    CommonReducer: CommonReducer,
    UserReducer: persistReducer(persistConfig, UserReducer),
});

const RootReducer = (state, action) => {
    if (action.type === SET_USER_LOGOUT) {
        state = undefined;
    }
    return AppReducers(state, action);
};

export default RootReducer;
