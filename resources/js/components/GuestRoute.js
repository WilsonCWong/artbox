import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';

/**
 * Route that only allows unauthenticated users (guests) to view.
 */
export function GuestRoute({ children, ...rest }) {
  const authenticated = useSelector(state => state.auth.authenticated);
  const authenticating = useSelector(state => state.auth.isAuthenticating);

  if (authenticating) return null;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}