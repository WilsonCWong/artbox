import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { initStore } from './store';
import AuthProvider from './components/AuthProvider';
import { PrivateRoute } from "./components/PrivateRoute";
import { GuestRoute } from "./components/GuestRoute";
import TopNavigation from './components/TopNavigation';

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";




const store = initStore();

function App() {

  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <TopNavigation />

          <Switch>
            <PrivateRoute exact path='/'><Home /></PrivateRoute>
            <GuestRoute path='/login'><Login /></GuestRoute>
            <GuestRoute path='/register'><Register /></GuestRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
