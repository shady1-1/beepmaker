import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../../routes/restaurant";

import "./account.css";

const AccountPage = () => {
  const [fullname, setFullname] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [societyName, setSocietyName] = useState("");
  const [siretNumber, setSiretNumber] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldOfActivity, setFieldOfActivity] = useState("");

  const updateAccountLogic = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const {
      restorer,
      societyName,
      imageURL,
      siretNumber,
      address,
      phone,
      fieldOfActivity,
    } = JSON.parse(localStorage.getItem("user"));
    setImageURL(`${imageURL}`);
    setSocietyName(societyName);
    setFullname(restorer.fullname);
    setSiretNumber(siretNumber);
    setAddress(address);
    setPhone(phone);
    setFieldOfActivity(fieldOfActivity);
  }, []);

  return (
      <>
        <div className="account-container">
          <div className="account-content">
            <Link className="btn-back" to={routes.adminHomePage}>
              <img alt="loading" src="../../img/btn-back.png"></img>
              <span>Retour</span>
            </Link>
            <div className="cl">
              <div className="container-left">
                <div className="vertical-menu">
                  <div className="account-image">
                    <img alt="loading" src={'/api/restaurant/serveimg/'+imageURL}></img>
                  </div>
                  <div className="account-name">
                    <span>{societyName}</span>
                  </div>
                  <div className="separation"></div>
                  <div className="account-settings">
                    <Link className="active" to={routes.adminAccountPage}>
                      <span>Compte</span>
                    </Link>
                    <Link to={routes.adminLogoPage}>
                      <span>Logo</span>
                    </Link>
                    <Link to={routes.adminConfidentialityPage}>
                      <span>Confidentialit??</span>
                    </Link>
                    <Link to={routes.adminPaymentPage}>
                      <span>Modes de paiement</span>
                    </Link>
                    <Link to={routes.adminQRCode}>
                      <span>G??n??rer Qrcode</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="container-right">
                <div className="account">
                  <div className="account-title">Information Professionnelle</div>
                  <form>
                    <input
                        defaultValue={fullname}
                        placeholder="Nom et pr??nom du responsable"
                        name="fullname"
                    ></input>
                    <input
                        defaultValue={societyName}
                        placeholder="Nom de la soci??t??"
                        name="societyName"
                    ></input>
                    <input
                        defaultValue={siretNumber}
                        placeholder="Num??ro de siret"
                        name="siretNumber"
                    ></input>
                    <input
                        defaultValue={address}
                        placeholder="Adresse du siege social"
                        name="address"
                    ></input>
                    <input
                        defaultValue={phone}
                        placeholder="Num??ro de t??l??phone"
                        name="phone"
                    ></input>
                    <select
                        name="fieldOfActivity"
                        defaultValue={fieldOfActivity}
                        onChange={() => {}}
                    >
                      <option value="Restaurant" title="Restaurant">
                        Restaurant
                      </option>
                      <option
                          value="Soci??t?? ?? responsabilit?? limit??e (SARL)"
                          title="Soci??t?? ?? responsabilit?? limit??e (SARL)"
                      >
                        Soci??t?? ?? responsabilit?? limit??e (SARL)
                      </option>
                      <option
                          value="Soci??t?? unipersonnelle ?? responsabilit?? limit??e (SUARL)"
                          title="Soci??t?? unipersonnelle ?? responsabilit?? limit??e (SUARL)"
                      >
                        Soci??t?? unipersonnelle ?? responsabilit?? limit??e (SUARL)
                      </option>
                      <option
                          value="Soci??t?? anonyme (SA)"
                          title="Soci??t?? anonyme (SA)"
                      >
                        Soci??t?? anonyme (SA)
                      </option>
                      <option
                          value="Soci??t?? en commandite par actions (SCA)"
                          title="Soci??t?? en commandite par actions (SCA)"
                      >
                        Soci??t?? en commandite par actions (SCA)
                      </option>
                    </select>
                    <button
                        className="btn btn-account-submit"
                        onClick={updateAccountLogic}
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

export default AccountPage;