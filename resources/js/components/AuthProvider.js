import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import { authenticateUser, authenticating } from "../actions/auth";
import { updateUser } from "../actions/user";

/**
 * Performs the initial auth check and retrieval of the user and updates the Redux store.
 */
function AuthProvider({children}) {
  const isAuthenticating = useSelector(state => state.auth.isAuthenticating);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    axios.get('/web_api/checkAuth')
      .then(res => {
        dispatch(updateUser(res.data.user));
        dispatch(authenticateUser(true));
        dispatch(authenticating(false));
        history.push(location.pathname);
      })
      .catch(err => {
        dispatch(authenticating(false));
      });
  }, []);

  if (isAuthenticating) return null;

  return (
    <>
    { children }
    </>
  )
}

export default AuthProvider;