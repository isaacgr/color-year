import React from "react";

const feelingSelected = (name) => {
  return { type: "feelingSelected", value: name };
};

export default function PaletteNames({ data, state, dispatch }) {
  return (
    <div className="palette--names">
      {data.__schema.types.map((field) => {
        if (field.name === "Palette") {
          return field.fields.map((fieldOptions) => {
            return (
              <button
                key={fieldOptions.name}
                // style={{
                //   "--c-bg": `var(--${
                //     state.feelingToColor[fieldOptions.name] || "grey"
                //   })`
                // }}
                style={{
                  backgroundColor:
                    state.feelingToColor[fieldOptions.name] || "#A9A9A9"
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
