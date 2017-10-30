import {createStore,applyMiddleware} from 'redux';

import {persistStore,autoRehydrate} from 'redux-persist';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

const createStoreMiddleware  = applyMiddleware(thunk,logger)(createStore);


export default function AppStore(){
 return autoRehydrate()(createStoreMiddleware);
}