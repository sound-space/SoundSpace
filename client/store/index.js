import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import userObj from './user'
import channels from './channels'
import playerObj from './player'
import playerStateObj from './playerState'
import deviceId from './device'

const reducer = combineReducers({ userObj, channels, playerObj, playerStateObj, deviceId });
const middleware = applyMiddleware(thunkMiddleware, createLogger);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './channels';
export * from './playerState'
export * from './player'
export * from './device'
