import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import userObj from './user';
import channelsObj from './channels';
import playerObj from './player'

const reducer = combineReducers({ userObj, channelsObj, playerObj });
const middleware = applyMiddleware(thunkMiddleware, createLogger);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './channels';
