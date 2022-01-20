// import { combineReducers } from 'redux';

import {
  ADVERTS_LOADED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  TAGS_LOADED_FAILURE,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
  TAGS_LOADED_SUCCESS,
} from './types';

export const defaultState = {
  auth: true,
  adverts: {
    loaded: false,
    data: [],
  },
  tags: {
    loaded: false,
    data: [],
  },
  ui: {
    isLoading: false,
    error: null,
  },
};

// const reducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case AUTH_LOGIN:
//       return { ...state, auth: true };
//     case AUTH_LOGOUT:
//       return { ...state, auth: false };
//     case TWEETS_LOADED:
//       return { ...state, tweets: action.payload };
//     default:
//       return state;
//   }
// };

export function auth(authState = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return authState;
  }
}

export function adverts(advertsState = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };
    case ADVERT_LOADED_SUCCESS:
    case ADVERT_CREATED_SUCCESS:
      return { ...advertsState, data: [...advertsState.data, action.payload], error: null };
    default:
      return advertsState;
  }
}

export function tags(tagsState = defaultState.tags, action) {
  switch (action.type) {
    case TAGS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };
    default:
      return tagsState;
  }
}

export function ui(uiState = defaultState.ui, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
      return { isLoading: false, error: null };
    case AUTH_LOGIN_FAILURE:
      return { isLoading: false, error: action.payload };
    case ADVERTS_LOADED_FAILURE:
      return { isLoading: false, error: action.payload };
    case TAGS_LOADED_FAILURE:
      return { isLoading: false, error: action.payload };
    case UI_RESET_ERROR:
      return { ...uiState, error: null };
    default:
      return uiState;
  }
}

// function combinedReducer(state = defaultState, action) {
//   return {
//     auth: auth(state.auth, action),
//   };
// }

// const combinedReducerWithRedux = combineReducers({
//   auth: auth,
//   tweets: tweets,
// });

// const combinedReducerWithRedux = combineReducers({
//   auth,
//   tweets,
// });

// export default combinedReducerWithRedux;
