import React from "react";

// Present the user with the palette selector
// user must choose all colors, then submit to set the palette
// redirect to /home after
export default function Palette({ userId }) {
  return (
    <div className="container">
      <h1 className="title">Build Your Palette</h1>
      <p className="sub-title">
        Choose which colors best represent the moods below
      </p>
    </div>
  );
}
