import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/jwtUtils";

interface AuthProps extends RouteProps {
  component: any;
}

const AuthRoute = (props: AuthProps) => {
  const { component: Component, ...rest } = props;
  const isLogedIn = isUserLoggedIn();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isLogedIn ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
