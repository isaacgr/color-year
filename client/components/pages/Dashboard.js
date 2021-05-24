import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Redirect } from "react-router";
import NavBar from "../NavBar";
import Calendar from "../calendar/Calendar";

// check if user has setup palette
// if so, load the home page
// if not, load the palette setup page

export default function Dashboard({ userId, paletteSet }) {
  return paletteSet ? (
    <>
      <div className="dashboard-background"></div>

      <NavBar />
      <div className="container">
        <Calendar />
      </div>
    </>
  ) : (
    <Redirect to="/palette" />
  );
}
