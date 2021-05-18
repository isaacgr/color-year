import React from "react";
import colors from "../constants/colors";

const colorSelected = (color) => {
  return { type: "colorSelected", value: color };
};

export default function PaletteColors({ data, state, dispatch }) {
  return (
    <div className="palette--colors card color-selector" style={colors}>
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
            <label
              key={color.split("--")[1]}
              htmlFor={color.split("--")[1]}
              style={{ "--c-bg": `var(${color})` }}
            ></label>
          </>
        );
      })}
    </div>
  );
}
