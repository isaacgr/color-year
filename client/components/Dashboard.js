import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Redirect } from "react-router";

// check if user has setup palette
// if so, load the home page
// if not, load the palette setup page

const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      palette_set
    }
  }
`;

export default function Dashboard({ userId }) {
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { id: userId },
    fetchPolicy: "no-cache"
  });
  if (loading) return <h2 className="sub-title">Loading...</h2>;
  if (error) {
    console.log(error);
    return (
      <h2 className="sub-title" id="error">{`Error: ${error.message}`}</h2>
    );
  }
  if (data.length === 0) {
    return (
      <h2 className="sub-title" id="error">
        No data
      </h2>
    );
  }
  return data.user.palette_set ? (
    <div>
      <h1>Dashboard</h1>
    </div>
  ) : (
    <Redirect to="/palette" />
  );
}
