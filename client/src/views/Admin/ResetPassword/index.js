import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import routes from "../../../routes/restaurant";

import "./reset-password.css";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [canUpdate, setCanUpdate] = useState(true);
	const params=useParams();

  const resetPasswordLogic = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const resetPasswordForm = document.querySelector("form");
    const formData = new FormData(resetPasswordForm);

    const tmp = [];
    for (var value of formData.values()) tmp.push(value);

    const data = JSON.stringify({
      newPassword1: tmp.shift(),
      newPassword2: tmp.shift(),
    });

    await axios({
      url: "/api/restaurant/resetPassword",
      method: "POST",
      data,
      headers: {
        Authorization: `auth-token:${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        resetPasswordForm.reset();
        setMessage(res.data.message);

        if (/`/.test(res.data.message)) {
          var m = res.data.message.split("`");
          var a = m.pop();
          var b = m.pop();

          setMessage(`New passwords length (${b.length}) ${a.slice(2)}`);
        }
        setMessageType(res.data.success ? "ok" : "ko");
        setLoading(false);
        setCanUpdate(false);
      })
      .catch((e) => {
        resetPasswordForm.reset();
        const msg = e?.request?.response
          ? JSON.parse(e.request.response).message
          : e.message;
        setMessage(msg);
        setMessageType("ko");
        setLoading(false);
      });
  };

  useEffect(() => {
    const mailToken = params.token;

    async function fetchData(_mailToken) {
      setLoading(true);

      await axios({
        url: "/api/restaurant/verify-forgotPassword",
        method: "POST",
        headers: {
          Authorization: `auth-token:${_mailToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setToken(res?.data?.token);
          setMessage(res?.data?.message);
          setMessageType(res?.data?.success ? "ok" : "ko");
          res?.data?.success === false && setCanUpdate(false);
          setLoading(false);
        })
        .catch((e) => {
          const msg = e?.request?.response
            ? JSON.parse(e.request.response).message
            : e.message;
          setMessage(msg);
          setMessageType("ko");
          setCanUpdate(false);
          setLoading(false);
        });
    }

    fetchData(mailToken);
  }, [params]);

  return (
    <>
      <div className="resetPassword-container">
        <div className="container-left">
          <img alt="loading" src="../img/login3.jpg" />
        </div>
        <div className="container-right">
          {loading ? (
            <div className="container-loader">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="login">
              <Link to="/">
                <img alt="loading" src="../img/Group73.png"></img>
              </Link>
              {canUpdate === true ? (
                <>
                  <div className="login-title">Modifier votre mot de passe</div>
                  <form onSubmit={resetPasswordLogic}>
                    <input
                      type="password"
                      placeholder="Nouveau mot de passe"
                      name="new-password1"
                      required
                    ></input>
                    <input
                      type="password"
                      placeholder="Vérifier le nouveau mot de passe"
                      name="new-password2"
                      required
                    ></input>
                    {message && (
                      <div className={"alert-message " + messageType}>
                        {message}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-submit"
                    >
                      Modifier
                    </button>
                  </form>
                </>
              ) : (
                message && (
                  <>
                    <div className={"alert-message " + messageType}>
                      {message}
                    </div>
                    {messageType === "ko" ? (
                      <Link
                        className="login-link"
                        to={routes.adminForgotPassword}
                      >
                        Envoyer un autre Email ?
                      </Link>
                    ) : (
                      <Link className="login-link" to={routes.adminLoginPage}>
                        Page de connexion ?
                      </Link>
                    )}
                  </>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
