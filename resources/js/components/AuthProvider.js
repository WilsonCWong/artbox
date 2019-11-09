import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { authenticateUser } from "../actions/auth";

function AuthProvider({children}) {
  const [isDoneAuth, setIsDoneAuth] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios.get('/web_api/checkAuth')
      .then(res => {
        setIsDoneAuth(true);
        dispatch(authenticateUser(true));
        history.push('/');
      })
      .catch(err => {
        setIsDoneAuth(true);
        history.push('/login');
      });
  }, []);

  if (!isDoneAuth) return null;

  return (
    <>
    { children }
    </>
  )
}

export default AuthProvider;