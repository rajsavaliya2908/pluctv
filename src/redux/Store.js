import RootReducer from './reducers';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';


export const Store = createStore(RootReducer, applyMiddleware(thunk));
export const Persistor = persistStore(Store);
