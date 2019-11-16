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
import { GlobalStyle } from "./components/GlobalStyle";
import AuthProvider from './components/AuthProvider';
import { PrivateRoute } from "./components/PrivateRoute";
import { GuestRoute } from "./components/GuestRoute";
import TopNavigation from './components/TopNavigation';

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Settings from "./pages/settings";

import CreatePost from "./pages/posts/create";
import ViewPost from "./pages/posts/view";
import EditPost from "./pages/posts/edit";

import Profile from "./pages/profile";
import NoMatch from "./pages/errors/NoMatch";

const store = initStore();

function App() {

  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <AuthProvider>
          <TopNavigation />

          <Switch>
            <PrivateRoute exact path='/'><Home /></PrivateRoute>
            <PrivateRoute path="/settings"><Settings /></PrivateRoute>
            <PrivateRoute path="/profile/:username"><Profile /></PrivateRoute>
            <PrivateRoute path="/posts/create"><CreatePost /></PrivateRoute>
            <PrivateRoute path="/posts/:hexID/edit"><EditPost /></PrivateRoute>
            <PrivateRoute path="/posts/:hexID"><ViewPost /></PrivateRoute>
            <GuestRoute exact path='/login'><Login /></GuestRoute>
            <GuestRoute exact path='/register'><Register /></GuestRoute>
            <Route component={NoMatch} />
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
