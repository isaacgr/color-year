import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Redirect } from "react-router";
import NavBar from "../NavBar";
import Day from "../calendar/Day";

// check if user has setup palette
// if so, load the home page
// if not, load the palette setup page

export default function Dashboard({ userId, paletteSet }) {
  return paletteSet ? (
    <div>
      <div className="dashboard-background"></div>

      <NavBar />
      <div className="container">
        <Day />
      </div>
    </div>
  ) : (
    <Redirect to="/palette" />
  );
}
