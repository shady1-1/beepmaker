import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../../routes/restaurant";

import "./confidentiality.css";

const ConfidentialityPage = () => {
  const [societyName, setSocietyName] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const updatePasswordLogic = async (e) => {
    e.preventDefault();
    setLoading(true);

    const changePasswordForm = document.querySelector("form");
    const formData = new FormData(changePasswordForm);

    const tmp = [];
    for (var value of formData.values()) tmp.push(value);

    const data = JSON.stringify({
      oldPassword: tmp.shift(),
      newPassword1: tmp.shift(),
      newPassword2: tmp.shift(),
    });

    await axios({
      url: "/api/restaurant/confidentiality/changePassword",
      method: "POST",
      data,
      headers: {
        Authorization: `auth-token:${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (r.data.success === true) {
          setMessageType("ok");
          changePasswordForm.reset();
        } else {
          setMessageType("ko");
        }

        setMessage(r.data.message);

        if (/`/.test(r.data.message)) {
          var m = r.data.message.split("`");
          var a = m.pop();
          var b = m.pop();

          setMessage(`New passwords length (${b.length}) ${a.slice(2)}`);
        }
        setLoading(false);
      })
      .catch((e) => {
        const msg = e?.request?.response
          ? JSON.parse(e.request.response).message
          : e.message;
        setMessage(msg);
        setLoading(false);
      });
  };

  useEffect(() => {
    const { societyName, email, imageURL } = JSON.parse(
      localStorage.getItem("user")
    );
    setEmail(`Votre adresse e-mail est ${email}`);
    setSocietyName(societyName);
    setImageURL(`${imageURL}`);
  }, []);

  return (
    <>
      <div className="confidentiality-container">
        <div className="confidentiality-content">
          <Link className="btn-back" to={routes.adminHomePage}>
            <img alt="loading" src="../../img/btn-back.png" />
            <span>Retour</span>
          </Link>

          <div className="cl">
            <div className="container-left">
              <div className="vertical-menu">
                <div className="confidentiality-image">
                  <img alt="loading" src={'/api/restaurant/serveimg/'+imageURL}></img>
                </div>
                <div className="confidentiality-name">
                  <span>{societyName}</span>
                </div>
                <div className="separation"></div>
                <div className="confidentiality-settings">
                  <Link to={routes.adminAccountPage}>
                    <span>Compte</span>
                  </Link>
                  <Link to={routes.adminLogoPage}>
                    <span>Logo</span>
                  </Link>
                  <Link className="active" to={routes.adminConfidentialityPage}>
                    <span>Confidentialité</span>
                  </Link>
                  <Link to={routes.adminPaymentPage}>
                    <span>Modes de paiement</span>
                  </Link>
                  <Link to={routes.adminQRCode}>
                    <span>Générer Qrcode</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="container-right">
              <div className="confidentiality">
                <form onSubmit={updatePasswordLogic}>
                  <label className="email confidentiality-title">E-mail</label>
                  <input
                    defaultValue={email}
                    placeholder="Nom et prénom du responsable"
                  />
                  <label className="password confidentiality-title">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    placeholder="Saisir votre mot de passe actuel"
                    name="password-old"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Saisir votre nouveau mot de passe"
                    name="password-new"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Saisir votre nouveau mot de passe"
                    name="password-new-2"
                    required
                  />
                  {message && (
                    <div className={"alert-message " + messageType}>
                      {message}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-confidentiality-submit"
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

export default ConfidentialityPage;
