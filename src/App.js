import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.css';
import { useEffect, useRef, useState } from 'react';

import LoginPage from './components/auth/LoginPage/LoginPage.js';
import { AuthContextProvider } from './components/auth/context';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };
  return (
    <Router>
      <AuthContextProvider value={{ isLogged, handleLogin }}>
        <div className="App"></div>
        <Route path="/login">
          {(routeProps) => <LoginPage />}
        </Route>
      </AuthContextProvider>
    </Router>
  );
}

export default App;