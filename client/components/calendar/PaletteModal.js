import React from "react";
import Modal from "react-modal";
import PaletteNames from "../PaletteNames";

export default function PaletteModal({
  userId,
  feelingToColor,
  dispatch,
  showModal,
  handleCloseModal
}) {
  Modal.setAppElement("body");
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      className="modal"
      // style={{
      //   content: {
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     margin: "0 auto",
      //     width: "30%",
      //     flexDirection: "column",
      //     borderRadius: "10px"
      //   }
      // }}
    >
      <h1 className="sub-title">Choose a color to represent today</h1>
      <PaletteNames
        userId={userId}
        feelingToColor={feelingToColor}
        dispatch={dispatch}
      />
    </Modal>
  );
}
