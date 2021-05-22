import React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { createBrowserHistory } from "history";
import UserProvider from "./contexts/UserProvider";
import Palette from "./components/pages/Palette";
import NotFound from "./svg/components/NotFound";

const history = createBrowserHistory();

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <UserProvider>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
            ></PrivateRoute>
            <PrivateRoute path="/palette" component={Palette}></PrivateRoute>
            <Route component={NotFound}></Route>
          </Switch>
        </UserProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
