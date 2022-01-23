// import { combineReducers } from 'redux';
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,

  ADVERTS_LOADED_SUCCESS,
  LOAD_ADVERTS_FAILURE,

  TAGS_LOADED_SUCCESS,
  LOAD_TAGS_FAILURE,

  ADVERT_LOADED_SUCCESS,
  LOAD_ADVERT_FAILURE,

  DELETE_ADVERT_REQUEST,
  DELETE_ADVERT_SUCCESS,
  DELETE_ADVERT_FAILURE,

  ADVERT_CREATED_SUCCESS,
  ADVERT_CREATED_FAILURE,
  UI_RESET_ERROR,
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
  deleted: false,
};

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
      return { ...advertsState, loaded: true, data: [...advertsState.data, action.payload] };
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

export function deleted(deletedState = defaultState.deleted, action) {
  switch (action.type) {
    case DELETE_ADVERT_SUCCESS:
      return true;
    default:
      return deletedState;
  }
}

export function ui(uiState = defaultState.ui, action) {
  switch (action.type) {
    //LOGIN
    case AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
      return { isLoading: false, error: null };
    case AUTH_LOGIN_FAILURE:
      return { isLoading: false, error: action.payload };
    // ADVERTS UI
    case LOAD_ADVERTS_FAILURE:
      return { isLoading: false, error: action.payload };
    // ADVERT UI
    case LOAD_ADVERT_FAILURE:
      return { isLoading: false, error: action.payload };
    // TAGS UI
    case LOAD_TAGS_FAILURE:
      return { isLoading: false, error: action.payload };
    // DELETE ADVERT UI
    case DELETE_ADVERT_REQUEST:
      return { isLoading: true, error: null };
    case DELETE_ADVERT_FAILURE:
      return { isLoading: false, error: action.payload };
    // CREATE ADVERT FAILURE UI
    case ADVERT_CREATED_FAILURE:
      return { isLoading: false, error: action.payload };
    case UI_RESET_ERROR:
      return { ...uiState, error: null };
    default:
      return uiState;
  }
}
