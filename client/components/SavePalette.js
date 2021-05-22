import React from "react";

export default function SavePalette({
  userId,
  paletteData,
  mutationResult,
  setPaletteData,
  saveSuccess
}) {
  return (
    <button
      className="btn btn-outline-primary save-button"
      style={
        mutationResult.error
          ? { backgroundColor: "#db0000", color: "#ffffff" }
          : saveSuccess
          ? { backgroundColor: "#2ecc71", color: "#ffffff" }
          : {}
      }
      onClick={() =>
        setPaletteData({
          variables: {
            userId,
            paletteData
          }
        })
      }
    >
      <span
        className={
          mutationResult.loading
            ? `${"spinner-border spinner-border-sm"}`
            : "hidden"
        }
        role="status"
        aria-hidden="true"
      ></span>
      Save Palette
    </button>
  );
}
