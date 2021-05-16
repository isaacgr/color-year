import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const PALETTE_SCHEMA_QUERY = gql`
  query {
    __schema {
      types {
        name
        fields {
          name
        }
      }
    }
  }
`;

const colors = {
  "--blue": "#5588a3",
  "--orange": "#f7931e",
  "--pink": "#ec3667",
  "--red": "#e2434b",
  "--yellow": "#ffc60b",
  "--green": "#c6e377",
  "--purple": "#aa5c9f",
  "--black": "#2b2b28"
};

// Present the user with the palette selector
// user must choose all colors, then submit to set the palette
// redirect to /home after
export default function Palette({ userId }) {
  const { loading, error, data } = useQuery(PALETTE_SCHEMA_QUERY, {
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
  return (
    <div className="container">
      <h1 className="title">Build Your Palette</h1>
      <p className="sub-title">
        Choose which colors best represent the moods below
      </p>
      <div className="palette">
        <div className="palette--names">
          <div className="card">
            {/* {data.__schema.types.map((field) => {
            if (field.name === "Palette") {
              return field.fields.map((fieldOptions) => {
                return (

                );
              });
            }
          })} */}
          </div>
        </div>
        <div className="palette--colors">
          <div className="card color-selector" style={colors}>
            {Object.keys(colors).map((color) => {
              return (
                <>
                  <input
                    type="radio"
                    id={color.split("--")[1]}
                    name="colors"
                    className="color-input"
                  ></input>
                  <label for={color.split("--")[1]}></label>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
