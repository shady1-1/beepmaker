import { useEffect, useRef, useState } from "react";
import BeepDetails from "../../../components/Client/BeepDetails";
import GenerateBeep from "../../../components/Client/GenerateBeep";
import io from "socket.io-client";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
//import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";

import "./client.css";
import routes from "../../../routes/client";

const Client = () => {
  const { restaurantId } = useParams();
  const [imageURL, setImageURL] = useState("");

  const [beep, setBeep] = useState(null);
  const [showBepp, setShowBepp] = useState(false);
  const [beepToken, setBeepToken] = useState(
    localStorage.getItem("beepToken") || null
  );
  const socketRef = useRef();

  window.OneSignal = window.OneSignal || [];
  const OneSignal = window.OneSignal;
  useEffect(() => {
    OneSignal.push(function () {
      OneSignal.init({
        appId: "d5ac5184-7776-4e38-b5bd-6ae8aa57fa95",
        safari_web_id:
          "web.onesignal.auto.3b9e77c1-5852-4edd-a278-c29c156a72b0",
        notifyButton: {
          enable: true,
        },
        welcomeNotification: {
          title: "One Signal",
          message: "Thanks for subscribing!",
        },
      });
    });
  }, []);
  useEffect(() => {
    fetchData();

    if (socketRef.current) socketRef.current.offAny();
    if (!beepToken) {
      return;
    }
    socketRef.current = io("/");
    socketRef.current.emit("auth", { beepToken });
    socketRef.current.on("auth", (data) => {
      if (!data.success) {
        (() => setBeepToken(null))();
        localStorage.removeItem("beepToken");
      } else {
        setBeep(data.beep);
        setShowBepp(true);
      }
    });
    socketRef.current.on("getUpdate", (data) => {
      const { beep, change } = data;
      switch (change) {
        case "delete":
          localStorage.removeItem("beepToken");
          setBeep(null);
          setBeepToken(null);
          setShowBepp(false);
          break;
        case "call":
          console.log("test");
          setBeep(beep);
          showNotification();
          break;
        default:
          setBeep(beep);
          break;
      }
    });
  }, [beepToken]);

  const fetchData = async () => {
    await axios({
      url: `/api/restaurant/${restaurantId}`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      if (res.data) {
        setImageURL(res.data.data[0].imageURL);
        localStorage.setItem("user", JSON.stringify(res.data.data[0]));
      }
    });
  };



  function showNotification() {
    addNotification({
      title: "Notification",
      subtitle: "This is a subtitle",
      message: "votre commande est prête",
      theme: "darkblue",
      vibrate:true,
      native: true, // when using native, your OS will handle theming.
    });
  }
  setTimeout('window.location.reload();', 30000);
  return (
    <div className="beep-client">
      {!showBepp && (
        <div className="beep-client-container">
          <div className="beep-client-sub-container">
            <img
              alt="loading"
              src={'/api/restaurant/serveimg/'+imageURL}
            ></img>
            <h5 className="beep-client-text">Bienvenue</h5>
            {!beepToken ? (
              <GenerateBeep
                setBeepToken={setBeepToken}
                setShowBepp={setShowBepp}
                restaurantId={restaurantId}
              />
            ) : (
              <button
                className="btn-submit btn text"
                onClick={() => {
                  setShowBepp(true);

                }}
              >
                Consulter beep
              </button>
            )}
            <button className="btn-submit btn text">
            <Link  to='/restaurant/Menu/${restauranId}' >

              <span>Voir la carte</span>
            </Link>
            </button>
            <button className="btn-submit btn text">Mes points fidélité</button>
          </div>
        </div>
      )}
      {showBepp && beep && (

        <div className="beep-client-container2">
          <div className="btn-back-container">
            <div
              className=""
              onClick={() => {
                setShowBepp(false);
              }}
            >
              <img alt="loading" src="../../img/arrow.png"></img>

            </div>
          </div>
          <BeepDetails beep={beep} />
        </div>
      )}
    </div>
  );
};

export default Client;
