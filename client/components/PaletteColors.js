import React from "react";
import colors from "../constants/colors";

const colorSelected = (color) => {
  return { type: "colorSelected", value: color };
};

export default function PaletteColors({ data, state, dispatch }) {
  return (
    <div className="color-selector">
      {colors.map((color) => {
        return (
          <>
            <div key={color} className="card color-card">
              <div
                className="canvas"
                // style={{ "--c-bg": `var(${color})` }}
                style={{ background: color }}
                onClick={(e) => {
                  dispatch(colorSelected(e.target.id));
                }}
                id={color}
                key={color + "-key"}
              ></div>
            </div>
          </>
        );
      })}
    </div>
  );
}
