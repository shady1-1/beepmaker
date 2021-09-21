import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import "./confirmed-beep.css";
import React, { useState } from 'react';

const ConfirmedbeepItem = ({ beep, makeRequest }) => {
  const [color,setColor]=useState('green');
  const [textColor,setTextColor]=useState('white');
    return (
    <div className="confirmed-beep">
      <h1 className="confirmed-beep-number">N°{beep.numero}</h1>
      <div className="confirmed-beep-date">
        <p className="confirmed-beep-date-content">Note :</p>
        <p className="confirmed-beep-date-title">
          {beep.note ? beep.note : "pas de note"}
        </p>
      </div>

      <button
       style={{background:color,color:textColor}}    className="ml-auto confirmed-beep-call btn"
       onClick={()=>{setColor("red");setTextColor('white');
         makeRequest(beep._id, "call");
       }}


      >
        <FontAwesomeIcon
          className="confirmed-beep-call-icom"
          icon={faPhoneAlt}
        />
        Appeler
      </button>

      {!beep.confirmed && (
        <button
          onClick={() => {
            makeRequest(beep._id, "confirm");
          }}
        >
          Confirme
        </button>
      )}
      <div
        id="mdiv"
        className="btn"
        onClick={() => {
          makeRequest(beep._id, "delete");
        }}
      >
        <div className="mmdiv">
          <div className="mdiv">
            <div className="md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedbeepItem;
