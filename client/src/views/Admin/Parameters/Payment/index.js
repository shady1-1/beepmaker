import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../../routes/restaurant";

import "./payment.css";

const Payment = () => {
  const [societyName, setSocietyName] = useState("");
  const [imageURL, setImageURL] = useState("");

  const updatePaymentMethodLogic = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const { societyName, imageURL } = JSON.parse(localStorage.getItem("user"));
    setSocietyName(societyName);
    setImageURL(`${imageURL}`);
  }, []);

  return (
    <>
      <div className="payment-container">
        <div className="payment-content">
          <Link className="btn-back" to={routes.adminHomePage}>
            <img alt="loading" src="../../img/btn-back.png" />
            <span>Retour</span>
          </Link>

          <div className="cl">
            <div className="container-left">
              <div className="vertical-menu">
                <div className="payment-image">
                  <img alt="loading" src={'/api/restaurant/serveimg/'+imageURL} />
                </div>
                <div className="payment-name">
                  <span>{societyName}</span>
                </div>
                <div className="separation"></div>
                <div className="payment-settings">
                  <Link to={routes.adminAccountPage}>
                    <span>Compte</span>
                  </Link>
                  <Link to={routes.adminLogoPage}>
                    <span>Logo</span>
                  </Link>
                  <Link to={routes.adminConfidentialityPage}>
                    <span>Confidentialité</span>
                  </Link>
                  <Link className="active" to={routes.adminPaymentPage}>
                    <span>Modes de paiement</span>
                  </Link>
                  <Link to={routes.adminQRCode}>
                    <span>Générer Qrcode</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="container-right">
              <div className="payment">
                <form>
                  <div>
                    <input
                      id="card"
                      type="radio"
                      defaultChecked
                      name="card"
                    ></input>
                    <label className="payment-label-1" htmlFor="card">
                      Carte de crédit
                    </label>
                  </div>

                  <label className="payment-label-2" htmlFor="paymentType">
                    Méthode de payment
                  </label>
                  <select
                    id="paymentType"
                    name="fieldOfActivity"
                    defaultValue="new"
                    onChange={() => {}}
                  >
                    <option title="Restaurant">Nouvelle Carte</option>
                  </select>

                  <label className="payment-label-3" htmlFor="cardNumber">
                    Numéro de carte
                  </label>
                  <input
                    id="cardNumber"
                    defaultValue=""
                    placeholder=" "
                    name="cardNumber"
                  ></input>

                  <div className="payment-cardExpirationDate-cardSecretCode">
                    <div className="payment-cardExpirationDate">
                      <label
                        className="payment-label-4"
                        htmlFor="cardExpirationDate"
                      >
                        Expiration
                      </label>
                      <input
                        id="cardExpirationDate"
                        defaultValue=""
                        placeholder=" "
                        name="cardExpirationDate"
                      ></input>
                    </div>
                    <div className="payment-cardSecretCode">
                      <label
                        className="payment-label-5"
                        htmlFor="cardSecretCode"
                      >
                        Code de sécurité
                      </label>
                      <input
                        id="cardSecretCode"
                        type="password"
                        defaultValue=""
                        placeholder=" "
                        name="cardSecretCode"
                      ></input>
                    </div>
                  </div>
                  <button
                    className="btn btn-payment-submit"
                    onClick={updatePaymentMethodLogic}
                  >
                    Enregistrer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
