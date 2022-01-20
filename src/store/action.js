import {
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    TAGS_LOADED_SUCCESS,
    AUTH_LOGOUT,
    ADVERTS_LOADED_SUCCESS,
    UI_RESET_ERROR,
    TAGS_LOADED_FAILURE,
    ADVERTS_LOADED_FAILURE,
} from './types';

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

export function authLogin(checked, credentials, history) {
    // This function will be a redux action
    return async function (dispatch, getState, { api }) {
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

export function loadAdvertsFailure(error) {
    return {
        type: ADVERTS_LOADED_FAILURE,
        error: true,
        payload: error,
    };
}

export function loadTagsFailure(error) {
    return {
        type: TAGS_LOADED_FAILURE,
        error: true,
        payload: error,
    };
}

export function advertsLoaded(adverts) {
    return {
        type: ADVERTS_LOADED_SUCCESS,
        payload: adverts,
    };
}

export function tagsLoaded(tags) {
    return {
        type: TAGS_LOADED_SUCCESS,
        payload: tags,
    };
}

export function loadAdverts() {
    return async function (dispatch, getState, { api }) {
        // if (areTweetsLoaded(getState())) {
        //     return;
        // }
        // dispatch loadTweetsRequest
        try {
            const adverts = await api.adverts.getLatestAdverts();
            dispatch(advertsLoaded(adverts));
        } catch (error) {
            dispatch(loadAdvertsFailure(error))
        }
    };
}

export function loadTags() {
    return async function (dispatch, getState, { api }) {
        try {
            const tags = await api.adverts.getTags();
            dispatch(tagsLoaded(tags));
        } catch (error) {
            dispatch(loadTagsFailure(error))
        }
    };
}

export function tweetLoaded(tweet) {
    return {
        type: "",
        payload: tweet,
    };
}

// export function loadTweet(tweetId) {
//     return async function (dispatch, getState, { api, history }) {
//         const tweet = getTweet(getState(), tweetId);
//         if (tweet) {
//             return;
//         }
//         // dispatch loadTweetRequest
//         try {
//             const tweet = await api.tweets.getTweet(tweetId);
//             dispatch(tweetLoaded(tweet));
//         } catch (error) {
//             // dispatch(loadTweetFailure(error));
//             // if (error.status === 404) {
//             //   history.push('/404');
//             // }
//         }
//     };
// }

export function tweetCreated(tweet) {
    return {
        type: "",
        payload: tweet,
    };
}

export function createTweet(tweet) {
    return async function (dispatch, getState, { api, history }) {
        // dispatch createTweetRequest
        try {
            const newTweet = await api.tweets.createTweet(tweet);
            // this call is neede because the created tweet is incomplete (sparrest)
            const createdTweet = await api.tweets.getTweet(newTweet.id);
            dispatch(tweetCreated(createdTweet));
            history.push(`/tweets/${createdTweet.id}`);
        } catch (error) {
            // dispatch(createTweetFailure(error));
            // if (error.status === 401) {
            //   history.push('/login');
            // }
        }
    };
}