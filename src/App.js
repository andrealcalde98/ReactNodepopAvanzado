import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';


import LoginPage from './components/auth/LoginPage/LoginPage.js';
import PrivateRoute from './components/auth/PrivateRoute.js';
import AdvertsPage from "./components/adverts/AdvertsPage/AdvertsPage";
import AdvertPage from "./components/adverts/AdvertDetailPage/AdvertPage";
import NewAdvertsPage from "./components/adverts/NewAdvertsPage/NewAdvertsPage";

function App() {

  return (
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
  );
}

export default App;