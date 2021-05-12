import React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { createBrowserHistory } from "history";
import UserProvider from "./contexts/UserProvider";

const history = createBrowserHistory();

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <UserProvider>
            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
            ></PrivateRoute>
          </UserProvider>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
