import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { createBrowserHistory } from 'history';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import storage from './utils/storage';
import { configureClient } from './api/client';
import configureStore from './store/index'

const accessToken = storage.get('auth');
configureClient({ accessToken })
const history = createBrowserHistory();

// configuramos el store añadiendo lo que necesitamos
const store = configureStore({ auth: !!accessToken }, { history });

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} history={history}>
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
