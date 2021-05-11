import React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login'

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" component={Login}></Route>
      </Router>
    </ApolloProvider>
  );
};

export default App;
