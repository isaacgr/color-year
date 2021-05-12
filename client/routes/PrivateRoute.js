import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserProvider from "../contexts/UserProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userData = useContext(UserProvider.context);
  return (
    <Route
      {...rest}
      render={() =>
        userData &&
        Object.keys(userData).length === 0 &&
        userData.constructor === Object ? (
          <Component />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
