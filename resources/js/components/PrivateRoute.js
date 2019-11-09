import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ children, ...rest }) {
  const authenticated = useSelector(state => state.auth.authenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}