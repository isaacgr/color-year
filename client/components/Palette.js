import React, { useReducer, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import PaletteNames from "./PaletteNames";
import PaletteColors from "./PaletteColors";

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
          ...state.feelingToColor,
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
  useEffect(() => {
    if (!data) {
      return;
    }
    for (const [key, value] of Object.entries(data.palette)) {
      dispatch(setPalette(key, value));
    }
  }, [data]);
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
        <PaletteNames data={data} state={state} dispatch={dispatch} />
        <PaletteColors data={data} state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
