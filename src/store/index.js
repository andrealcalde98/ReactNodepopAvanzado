import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import * as reducers from './reducers';
import thunk from 'redux-thunk';

import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';


const api = { auth, adverts };

// const logger = store => next => action => {};

// const routerMiddleware = history => store => next => action => {};

function logger(store) {
    return function (next) {
        return function (action) {
            console.log('****dispatching action****', action);
            const result = next(action);
            console.log('****new state****', store.getState());
            return result;
        };
    };
}

// function thunk(store) {
//   return function (next) {
//     return function (action) {
//       if (typeof action === 'function') {
//         return action(store.dispatch, store.getState);
//       }
//       return next(action);
//     };
//   };
// }

const configureStore = (preloadedAuthState, { history }) => {
    const middlewares = [
        routerMiddleware(history),
        thunk.withExtraArgument({ api, history }),
        logger,
    ];

    const store = createStore(
        combineReducers({ ...reducers, router: connectRouter(history) }),
        preloadedAuthState,
        composeWithDevTools(applyMiddleware(...middlewares)),
    );
    return store;
};

export default configureStore;