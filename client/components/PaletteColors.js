import React from "react";
import colors from "../constants/colors";

const colorSelected = (color) => {
  return { type: "colorSelected", value: color };
};

export default function PaletteColors({ dispatch }) {
  return (
    <div className="color-selector">
      {colors.map((color) => {
        return (
          <div key={color} className="card color-card">
            <div
              className="canvas"
              style={{ background: color }}
              onClick={(e) => {
                dispatch(colorSelected(e.target.id));
              }}
              id={color}
              key={color + "-key"}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
