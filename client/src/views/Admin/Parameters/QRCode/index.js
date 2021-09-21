import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import "./qr-code.css";
import {Link} from "react-router-dom";
import routes from "../../../../routes/restaurant";
const QRcode = () => {
  const [image, setImageURL] = useState("");
  const [restauranId, setRestauranId] = useState("");
  useEffect(() => {
    const { _id, imageURL } = JSON.parse(localStorage.getItem("user"));
    setImageURL(imageURL);
    setRestauranId(_id);
  }, [setImageURL, setRestauranId]);



  return (
     <div> <Link className="btn-back" to={routes.adminAccountPage}>
        <img alt="loading" src="../../img/btn-back.png" />
        <span>Retour</span>
      </Link>


    <div className="qr-code-page">

      <div className="qr-code-container">

        <div className="logo-qr-bg logo-qr-client">
        <img
            className="logo-qr"
            src="/img/Group73.png"
            alt="Loading..."
          ></img>
          <div
            style={{
              backgroundImage: 'url("")',
            }}
            className="logo-qr"
          ></div>
        </div>
        <div className="logo-qr-bg logo-qr-beep">
          <img
            className="logo-qr"
            src={'/api/restaurant/serveimg/'+image}
            alt="Loading..."
          ></img>
          <div
            style={{
              backgroundImage: `url("")`,
            }}
            className="logo-qr"
          />
        </div>
        <QRCode
          size={400}
          className="qrcode"
          value={`https://beep-maker.herokuapp.com/restaurant/beep/${restauranId}`}
        />
      </div>
    </div>
     </div>
  );
};

export default QRcode;
