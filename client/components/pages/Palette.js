import React, { useReducer, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import PaletteNames from "../PaletteNames";
import PaletteColors from "../PaletteColors";
import SavePalette from "../SavePalette";
import NavBar from "../NavBar";

const SET_PALLETE = gql`
  mutation SetPalette($userId: ID!, $paletteData: PaletteInput!) {
    setPalette(userId: $userId, paletteData: $paletteData) {
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

const SET_USER_PALETTE = gql`
  mutation SetUserPalette($userId: ID!, $paletteSet: Boolean!) {
    setUserPalette(userId: $userId, paletteSet: $paletteSet)
  }
`;

const initialState = {
  selectedFeeling: null,
  selectedColor: null,
  feelingToColor: {},
  saveSuccess: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "feelingSelected":
      return {
        ...state,
        selectedFeeling: action.value
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
    case "saveSuccess":
      return {
        ...state,
        saveSuccess: action.value
      };
    default:
      throw new Error();
  }
};

const setSaveSuccess = (success) => {
  return { type: "saveSuccess", value: success };
};

export default function Palette({ userId }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [setUserPalette] = useMutation(SET_USER_PALETTE);

  const [setPaletteData, mutationResult] = useMutation(SET_PALLETE, {
    onCompleted: () => {
      dispatch(setSaveSuccess(true));
      setTimeout(() => {
        dispatch(setSaveSuccess(false));
      }, 1000);
    }
  });

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="palette">
          <PaletteNames
            userId={userId}
            feelingToColor={state.feelingToColor}
            dispatch={dispatch}
          />
          <PaletteColors dispatch={dispatch} />
        </div>
        <SavePalette
          userId={userId}
          paletteData={state.feelingToColor}
          setPaletteData={setPaletteData}
          mutationResult={mutationResult}
          saveSuccess={state.saveSuccess}
        />
        {mutationResult.error && (
          <h2
            className="sub-title"
            id="error"
          >{`Unable to save palette. ${mutationResult.error.message}`}</h2>
        )}
      </div>
    </>
  );
}
