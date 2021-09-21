import axios from "axios";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import routes from "../../../routes/restaurant";

import "./register.css";

const RegisterPage = (props) => {
  const [rightMenuActiveBtn, setrightMenuActiveBtn] = useState("a1");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (props.type) {
      if (props.type === "pro") {
        changeView("cmvnax");
        setrightMenuActiveBtn("a3");
      } else if (props.type === "register") {
        changeView("ag9tzq");
        setrightMenuActiveBtn("a1");
      }
    } else {
      changeView("ag9tzq");
      setrightMenuActiveBtn("a0");
    }
  }, [location, props.type]);

  const changeView = (_to) => {
    setMessage([]);
    setMessageType("");
    document.querySelector(".register-container").setAttribute("dghlbw", _to);
  };

  const registerLogic = async (e) => {
    e.preventDefault();
    setLoading(true);

    const registerForm = document.querySelector("form");
    const formData = new FormData(registerForm);

    const tmp = [];
    for (var value of formData.values()) tmp.push(value);

    const data = JSON.stringify({
      restorer: {
        fullname: tmp.shift(),
      },
      societyName: tmp.shift(),
      siretNumber: tmp.shift(),
      address: tmp.shift(),
      phone: tmp.shift(),
      fieldOfActivity: tmp.shift(),
      email: tmp.shift(),
      password: tmp.shift(),
    });

    await axios({
      url: "/api/restaurant/register",
      method: "POST",
      data,
      headers: { "Content-Type": "application/json" },
      'Accept': 'application/json'
    })
      .then((r) => {
        const msg = r.data.message;
        const iteams = [];
        iteams.push(msg.substr(msg.indexOf(":") + 1));
        setMessage(iteams);
        setMessageType(r.data.status === "ok" ? "ok" : "ko");
        setLoading(false);
      })
      .catch((e) => {
        const msg = JSON.parse(e.request.response).message;
        const iteams = [];

        iteams.push(msg.substr(0, msg.indexOf(":")));
        msg
          .substr(msg.indexOf(":") + 1)
          .split(",")
          .map((e) => iteams.push(e));
        setMessage(iteams);
        setMessageType("ko");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="register-container" dghlbw="ag9tzq">
        <div className="register-content">
          <div className="navbar">
            <div className="logo">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/");
                  changeView("ag9tzq");
                }}
              >
                <img alt="loading" src="../img/Group73.png"></img>
              </a>
            </div>
            <div className={"menu-right " + rightMenuActiveBtn}>
              <Link className="btn-1" to={routes.adminRegisterPage}>
                Inscription
              </Link>
              <Link className="btn-1" to="/login">
                Connexion
              </Link>
              <Link className="btn-1" to={routes.adminRegisterProPage}>
                Espace pro
              </Link>
            </div>
          </div>
          <div className="container">
            <div className="img img1">
              <img
                alt="loading"
                src="../img/nate-johnston-ozHMc88WgcI-unsplash.jpg"
              />
              <div className="shadow">
                <div className="text text2">
                  <span className="text_1">
                    Cumulez vos points de fidélité dans tous les restaurants
                    partenaires
                  </span>
                  <br></br>
                  <button className="pro pro2">Commencez</button>
                </div>
              </div>
            </div>
            <div className="transition1"></div>
            <div className="img img2">
              <img
                alt="loading"
                src="../img/angelika-agibalova-_wb8P6oy3FE-unsplash.jpg"
              />
              <div className="shadow">
                <div className="text">
                  <span className="text_2">
                    Créez du lien avec vos clients avec Beepmaker
                  </span>
                  <br></br>
                  <button
                    className={"btn pro sonar " + rightMenuActiveBtn}
                    onClick={() => {
                      history.push("/register/pro");
                      changeView("cmvnax");
                    }}
                  >
                    Espace pro
                  </button>
                </div>
              </div>
            </div>
            <div className="transition2"></div>
            <div className="home-register">
              <div className="home-register2">
                <div className="title">
                  <h2>Demande de partenariat</h2>
                </div>
                <div className="content">
                  <form onSubmit={registerLogic}>
                    <input
                      type="text"
                      placeholder="Nom et prénom du responsable"
                      name="fullname"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Nom de la société"
                      name="societyName"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Numéro de siret"
                      name="siretNumber"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Adresse du siege social"
                      name="address"
                      required
                    />
                    <input
                      type="phone"
                      placeholder="Numéro de téléphone"
                      name="phone"
                      required
                    />
                    <select
                      name="fieldOfActivity"
                      defaultValue="test"
                      onChange={() => {}}
                    >
                      <option value="" disabled hidden>
                        Type d'entreprise
                      </option>
                      <option
                        value="Entreprise individuelle"
                        title="Entreprise individuelle"
                      >
                        Entreprise individuelle
                      </option>
                      <option
                        value="Société à responsabilité limitée (SARL)"
                        title="Société à responsabilité limitée (SARL)"
                      >
                        Société à responsabilité limitée (SARL)
                      </option>
                      <option
                        value="Société unipersonnelle à responsabilité limitée (SUARL)"
                        title="Société unipersonnelle à responsabilité limitée (SUARL)"
                      >
                        Société unipersonnelle à responsabilité limitée (SUARL)
                      </option>
                      <option
                        value="Société anonyme (SA)"
                        title="Société anonyme (SA)"
                      >
                        Société anonyme (SA)
                      </option>
                      <option
                        value="Société par actions simplifiée (SAS)"
                        title="Société par actions simplifiée (SAS)"
                      >
                        Société par actions simplifiée (SAS)
                      </option>
                    </select>
                    <input
                      type="email"
                      placeholder="Mail"
                      name="email"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      name="password"
                      required
                    />
                    {message.length > 0 && (
                      <div className={"alert-message " + messageType}>
                        {message.map((e, index) =>
                          index === 0 ? (
                            <span key={index}>
                              <b>{e}</b>
                            </span>
                          ) : (
                            <li key={index}>{e}</li>
                          )
                        )}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-submit"
                    >
                      Créer un compte
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;