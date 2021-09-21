import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./modal.css";

export const Modal = ({ showModals, setShowModal, makeRequest, beep }) => {
  const modalRef = useRef();
  const [note, setNote] = useState(beep.note);
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return createPortal(
    <>
      {showModals ? (
        <div className="modal-backgound" onClick={closeModal} ref={modalRef}>
          <div className="modal-form-wrapper" showModals={showModals}>
            <div className="notconfirmed-beep-container">
              <h1 className="notconfirmed-beep-number">N°{beep.numero}</h1>
              <button
                className="notconfirmed-beep-confirm half-btn btn"
                onClick={() => {
                  makeRequest(beep._id, "confirm");
                  setShowModal(false);
                }}
              >
                Accepter
              </button>
              <button
                className="notconfirmed-beep-delete half-btn btn"
                onClick={() => {
                  makeRequest(beep._id, "delete");
                  setShowModal(false);
                }}
              >
                Supprimer
              </button>
              <h6>Crée une note: </h6>
              <input
                type="textarea "
                onChange={(e) => setNote(e.target.value)}
                placeholder="Note ici ..."
              />
              <button
                className="notconfirmed-beep-confirm btn"
                onClick={() => {
                  makeRequest(beep._id, "add-note", note);
                  setShowModal(false);
                }}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.getElementById("modal")
  );
};
