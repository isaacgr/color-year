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
      <NavBar />
      <div className="container container--content">
        <div className="dashboard">
          <Calendar userId={userId} />
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/palette" />
  );
}
