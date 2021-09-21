import { useState } from "react";
import { Modal } from "../Modal";
import "./not-confirmed-beep.css";

const NotConfirmedbeepItem = ({ beep, makeRequest }) => {
  const [showModals, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(!showModals);
  };
  return (
    <>
      <Modal
        makeRequest={makeRequest}
        showModals={showModals}
        beep={beep}
        setShowModal={setShowModal}
      />
      <div className="notconfirmed-beep">
        <div className="notconfirmed-beep-container">
          <h1 className="notconfirmed-beep-number">N°{beep.numero}</h1>
          {!beep.confirmed && (
            <button
              className="notconfirmed-beep-confirm btn"
              onClick={() => {
                makeRequest(beep._id, "confirm");
              }}
            >
              Accepter
            </button>
          )}

          <button
            className="notconfirmed-beep-delete btn"
            onClick={() => {
              makeRequest(beep._id, "delete");
            }}
          >
            Refuser
          </button>

          <button className="notconfirmed-beep-note btn" onClick={openModal}>
            Créer note
          </button>
        </div>
      </div>
    </>
  );
};

export default NotConfirmedbeepItem;
