import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';

export function GuestRoute({ children, ...rest }) {
  const authenticated = useSelector(state => state.auth.authenticated);
  console.log({location});
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: location.origin,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}