import "./beeplist.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import io from "socket.io-client";
import { getBeepsApi } from "../../../api/beep.api";
import { Link } from "react-router-dom";
import ConfirmedbeepItem from "../../../components/Admin/confirmedBeep";
import NotConfirmedbeepItem from "../../../components/Admin/notConfirmedBeep";
import routes from "../../../routes/superAdmin";

const Beeps = () => {
  const [error, setError] = useState("");
  const [beeps, setBeeps] = useState([]);
  const [confirmedSelected, setConfirmedSelected] = useState(true);
  const [pendingBeepsNumber, setPendingBeepsNumber] = useState(0);

  const token = localStorage.getItem("token");
  const socketRef = useRef();

  useEffect(() => {
    getBeeps();
    if (socketRef.current) socketRef.current.offAny();
    socketRef.current = io("/");
    socketRef.current.on("snap", (data) => {
      const { change } = data;
      switch (change) {
        default:
          getBeeps();
          break;
      }
    });

    socketRef.current.on("error", (data) => {
      setError(data?.message || "Error from server");
    });
  }, []);
  const getBeeps = async () => {
    await getBeepsApi(token)
      .then((data) => {
        setBeeps(data);
        setPendingBeepsNumber(data.filter((e) => !e.confirmed).length);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const makeRequest = (beepId, request, note = null) => {
    if (!note) {
      console.log("test");
      return socketRef.current.emit(request, { beepId, token });
    }
    return socketRef.current.emit(request, { beepId, token, note });
  };

  return (
    <div className="restaurants-container">
      <div className="restaurants-content">
        <div className="super-admin">
          <div className="btn-back-container">
            <Link className="beep btn-back" to={routes.superAdminHomePage}>
              <img alt="loading" src="../../img/btn-back.png"></img>
              <span>Retour</span>
            </Link>
          </div>
          <div className="beeps-list-btn-items">
            <div
              className={
                "beeps-list " + (confirmedSelected ? "active" : "pending")
              }
            >
              <div className="djdsfpds">
                <button
                  className={
                    "btn beep-btn beep-btn-m " +
                    (confirmedSelected ? "active" : "")
                  }
                  disabled={confirmedSelected}
                  onClick={() => setConfirmedSelected(true)}
                >
                  En cours
                </button>
                <div className="beeps-list-pending-btn-container">
                  {pendingBeepsNumber > 0 && (
                    <div className="red-circle">{pendingBeepsNumber}</div>
                  )}
                  <button
                    className={
                      "btn beep-btn " + (confirmedSelected ? "" : "active")
                    }
                    disabled={!confirmedSelected}
                    onClick={() => setConfirmedSelected(false)}
                  >
                    En attente
                  </button>
                </div>
              </div>

              {error && <div>{error}</div>}
              {!!beeps.length && (
                <div className="beeps-list-items">
                  {beeps.map(
                    (beep) =>
                      beep.confirmed === confirmedSelected &&
                      (beep.confirmed ? (
                        <ConfirmedbeepItem
                          key={beep._id}
                          beep={beep}
                          makeRequest={makeRequest}
                        />
                      ) : (
                        <NotConfirmedbeepItem
                          key={beep._id}
                          beep={beep}
                          makeRequest={makeRequest}
                        />
                      ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beeps;
