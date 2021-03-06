import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserProvider from "../contexts/UserProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loadingComplete, auth] = useContext(UserProvider.context);
  return (
    loadingComplete && (
      <Route
        {...rest}
        component={() =>
          auth.authenticated ? (
            <Component userId={auth.userId} paletteSet={auth.paletteSet} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    )
  );
};

export default PrivateRoute;
