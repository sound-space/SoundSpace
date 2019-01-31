import { createStore, applyMiddleware } from 'redux';
import Axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const initialState = {
  channels: [],
  isLoggedIn: false,
  body: {},
  user: {},
  deviceId: '',
};

// Action Types
const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';
const SET_DEVICE = 'SET_DEVICE';
const SET_CHANNELS = 'SET_CHANNELS';

// action creator
export const getUser = () => ({
  type: GET_USER,
});

export const setUser = userInfo => ({
  type: SET_USER,
  payload: userInfo,
});

export const setDevice = deviceId => ({
  type: SET_DEVICE,
  payload: deviceId,
});

export const setChannels = channels => ({
  type: SET_CHANNELS,
  payload: channels,
});

// Thunk
export const fetchUser = () => async dispatch => {
  await Axios.get('/login');
};

export const fetchChannels = () => async dispatch => {
  const { data } = await Axios.get('/api/channels');
  dispatch(setChannels(data));
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, isLoggedIn: true };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_DEVICE:
      return { ...state, deviceId: action.payload };
    case SET_CHANNELS:
      return { ...state, channels: action.payload };
    default:
      return state;
  }
};

const middleware = applyMiddleware(thunkMiddleware, createLogger);
const store = createStore(reducer, middleware);

export default store;
