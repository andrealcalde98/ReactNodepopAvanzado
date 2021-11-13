import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import { useState } from 'react';
import { logout } from './components/auth/service';

import LoginPage from './components/auth/LoginPage/LoginPage.js';
import PrivateRoute from './components/auth/PrivateRoute.js';
import AdvertsPage from "./components/adverts/AdvertsPage/AdvertsPage";
import AdvertPage from "./components/adverts/AdvertDetailPage/AdvertPage";
import NewAdvertsPage from "./components/adverts/NewAdvertsPage/NewAdvertsPage";

import { AuthContextProvider } from './components/auth/context';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    logout().then(() => setIsLogged(false));
  };

  return (
    <Router>
      <AuthContextProvider value={{ isLogged, handleLogin, handleLogout }}>
        <div className="App">
          <Switch>
            <PrivateRoute path="/adverts/new">
              <NewAdvertsPage />
            </PrivateRoute>
            <PrivateRoute path="/adverts/:advertId">
              {routeProps => (
                <AdvertPage {...routeProps} />
              )}
            </PrivateRoute>
            <PrivateRoute path="/adverts">
              {(routeProps) => <AdvertsPage />}
            </PrivateRoute>
            <Route path="/login">
              {(routeProps) => <LoginPage {...routeProps} />}
            </Route>
            <Route path="/404">
              <div>404 | Not Found Page</div>
            </Route>
            <PrivateRoute exact path="/">
              <Redirect to="/adverts" />
            </PrivateRoute>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;