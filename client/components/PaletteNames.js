import React from "react";
import colors from "../constants/colors";

const feelingSelected = (name) => {
  return { type: "feelingSelected", value: name };
};

export default function PaletteNames({ data, state, dispatch }) {
  return (
    <div className="palette--names card" style={colors}>
      {data.__schema.types.map((field) => {
        if (field.name === "Palette") {
          return field.fields.map((fieldOptions) => {
            return (
              <button
                key={fieldOptions.name}
                style={{
                  "--c-bg": `var(--${
                    state.feelingToColor[fieldOptions.name] || "grey"
                  })`
                }}
                className={`btn btn-lg palette--feeling-btn`}
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
  );
}
