import React, { useReducer, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import FeelingJoy from "../svg/components/FeelingJoy";

const PALETTE_QUERY = gql`
  query PaletteQuery($userId: ID!) {
    __schema {
      types {
        name
        fields {
          name
        }
      }
    }
    palette(userId: $userId) {
      joy
      sadness
      anger
      fear
      trust
      jealous
      surprise
      anticipation
      spiritual
      neutral
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

const initialState = {
  selectedFeeling: null,
  selectedColor: null,
  feelingToColor: {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case "feelingSelected":
      return {
        ...state,
        selectedFeeling: action.value
        // feelingToColor: {
        //   ...state.feelingToColor,
        //   [action.value]: state.selectedColor
        // }
      };
    case "colorSelected":
      return {
        ...state,
        selectedColor: action.value,
        feelingToColor: {
          ...state.feelingToColor,~
          [state.selectedFeeling]: action.value
        }
      };
    case "setPalette":
      return {
        ...state,
        feelingToColor: {
          ...state.feelingToColor,
          [action.key]: action.value
        }
      };
    default:
      throw new Error();
  }
};

const feelingSelected = (name) => {
  return { type: "feelingSelected", value: name };
};

const colorSelected = (color) => {
  return { type: "colorSelected", value: color };
};

const setPalette = (feeling, color) => {
  return { type: "setPalette", key: feeling, value: color };
};

// Present the user with the palette selector
// user must choose all colors, then submit to set the palette
// redirect to /home after
export default function Palette({ userId }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, error, data } = useQuery(PALETTE_QUERY, {
    variables: { userId: userId },
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
  // for (const [key, value] of Object.entries(data.palette)) {
  //   dispatch(setPalette(key, value));
  // }
  return (
    <div className="container">
      <h1 className="title">Build Your Palette</h1>
      <p className="sub-title">
        Choose which colors best represent the moods below
      </p>
      <div className="palette">
        <div className="palette--names">
          <div className="card feeling-selector" style={colors}>
            {data.__schema.types.map((field) => {
              if (field.name === "Palette") {
                return field.fields.map((fieldOptions) => {
                  return (
                    <button
                      key={fieldOptions.name}
                      style={{
                        "--c-bg": `var(--${
                          state.feelingToColor[fieldOptions.name] || "black"
                        })`
                      }}
                      className={`btn btn-lg palette--feeling-btn ${
                        state.selectedFeeling === fieldOptions.name
                          ? "btn-secondary active"
                          : "btn-secondary"
                      }`}
                      onClick={() => {
                        dispatch(feelingSelected(fieldOptions.name));
                      }}
                    >
                      {fieldOptions.name.toUpperCase()}
                    </button>
                  );
                });
              }
            })}
          </div>
        </div>
        <div className="palette--colors">
          <div className="card color-selector" style={colors}>
            {Object.keys(colors).map((color) => {
              return (
                <>
                  <input
                    key={color}
                    type="radio"
                    id={color.split("--")[1]}
                    name="colors"
                    className="color-input"
                    value={color.split("--")[1]}
                    onClick={(e) => {
                      dispatch(colorSelected(e.target.value));
                    }}
                  ></input>
                  <label htmlFor={color.split("--")[1]}></label>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
