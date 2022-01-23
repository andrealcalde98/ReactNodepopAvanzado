import { getAdvert, getTags } from './selectors';
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

// LOGIN ACTIONS
export function authLoginRequest() {
    return {
        type: AUTH_LOGIN_REQUEST,
    };
}

export function authLoginSuccess() {
    return {
        type: AUTH_LOGIN_SUCCESS,
    };
}

export function authLoginFailure(error) {
    return {
        type: AUTH_LOGIN_FAILURE,
        error: true,
        payload: error,
    };
}

export function authLogin(checked, credentials) {
    // This function will be a redux action
    return async function (dispatch, getState, { api, history }) {
        dispatch(authLoginRequest());
        try {
            await api.auth.login(checked, credentials);
            dispatch(authLoginSuccess());
            const { from } = history.location.state || { from: { pathname: '/' } };
            history.replace(from);
        } catch (error) {
            dispatch(authLoginFailure(error));
        }
    };
}

export function authLogout() {
    return {
        type: AUTH_LOGOUT,
    };
}

export function uiResetError() {
    return {
        type: UI_RESET_ERROR,
    };
}


// Actions for ADVERTS
export function advertsLoaded(adverts) {
    return {
        type: ADVERTS_LOADED_SUCCESS,
        payload: adverts,
    };
}

export function loadAdvertsFailure(error) {
    return {
        type: LOAD_ADVERTS_FAILURE,
        error: true,
        payload: error,
    };
}

export function loadAdverts() {
    return async function (dispatch, getState, { api }) {
        try {
            const adverts = await api.adverts.getLatestAdverts();
            dispatch(advertsLoaded(adverts));
        } catch (error) {
            dispatch(loadAdvertsFailure(error))
        }
    };
}


// Actions for TAGS
export function tagsLoaded(tags) {
    return {
        type: TAGS_LOADED_SUCCESS,
        payload: tags,
    };
}

export function loadTagsFailure(error) {
    return {
        type: LOAD_TAGS_FAILURE,
        error: true,
        payload: error,
    };
}

export function loadTags() {
    return async function (dispatch, getState, { api }) {
        const tags = getTags(getState());
        if (tags.length >= 1) {
            return;
        }
        try {
            const tags = await api.adverts.getTags();
            dispatch(tagsLoaded(tags));
        } catch (error) {
            dispatch(loadTagsFailure(error))
        }
    };
}


// Actions for ADVERT
export function advertLoaded(advert) {
    return {
        type: ADVERT_LOADED_SUCCESS,
        payload: advert,
    };
}

export function loadAdvertFailure(error) {
    return {
        type: LOAD_ADVERT_FAILURE,
        error: true,
        payload: error,
    };
}

export function loadAdvert(advertId) {
    return async function (dispatch, getState, { api, history }) {
        const advert = getAdvert(getState(), advertId);
        if (advert) {
            return;
        }
        try {
            const advert = await api.adverts.getAdvert(advertId);
            dispatch(advertLoaded(advert));
        } catch (error) {
            dispatch(loadAdvertFailure(error));
            if (error.status === 404) {
                history.push('/404');
            }
        }
    };
}


// Action to delete ADVERT
export function deleteAdvertRequest() {
    return {
        type: DELETE_ADVERT_REQUEST,
    };
}

export function advertDeleted() {
    return {
        type: DELETE_ADVERT_SUCCESS,
    };
}

export function deleteAdvertFailure(error) {
    return {
        type: DELETE_ADVERT_FAILURE,
        error: true,
        payload: error
    }
}

export function deleteAdvert(advertId) {
    return async function (dispatch, getState, { api, history }) {
        dispatch(deleteAdvertRequest())
        try {
            await api.adverts.deleteAdvert(advertId);
            dispatch(advertDeleted());
            const { from } = history.location.state || { from: { pathname: '/' } };
            history.replace(from);
        } catch (error) {
            dispatch(deleteAdvertFailure(error))
        }
    };
}


// Action to create ADVERT
export function advertCreated(advert) {
    return {
        type: ADVERT_CREATED_SUCCESS,
        payload: advert,
    };
}

export function createAdvertFailure(error) {
    return {
        type: ADVERT_CREATED_FAILURE,
        error: true,
        payload: error,
    };
}

export function createAdvert(advert) {
    return async function (dispatch, getState, { api, history }) {
        try {
            const newAdvert = await api.adverts.createAdvert(advert);
            dispatch(advertCreated(newAdvert));
            history.push(`/adverts/${newAdvert.id}`);
        } catch (error) {
            dispatch(createAdvertFailure(error));
            if (error.status === 401) {
                history.push('/login');
            }
        }
    };
}