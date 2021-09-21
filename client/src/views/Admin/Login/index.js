import axios from "axios";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import routes from '../../../routes/restaurant';

import "./login.css";

const LoginPage = () => {
	const history = useHistory();
	const location = useLocation()

	const [message, setmessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const [loading, setLoading] = useState(false);

	const loginLogic = async (e) => {
		e.preventDefault();
		setLoading(true);
		setmessage("");
		const registerForm = document.querySelector("form");
		const formData = new FormData(registerForm);

		const tmp = [];
		for (var value of formData.values()) tmp.push(value);

		const data = JSON.stringify({
			email: tmp.shift(),
			password: tmp.shift(),
		});

		await axios({
			url: "/api/restaurant/login",
			method: "POST",
			data,
			headers: { "Content-Type": "application/json" },
		})
			.then(async (res) => {
				if (res.data.token) {
					setMessageType("ok");
					setmessage("Connexion success : Login ok");

					await axios({
						url: `/api/restaurant/${JSON.parse(atob(res.data.token.split(".")[1]))._id}`,
						method: "GET",
						data,
						headers: { "Content-Type": "application/json" },
					}).then(res2 => {
						localStorage.setItem("user", JSON.stringify(res2.data.data[0]));
						localStorage.setItem("token", res.data.token);
						setLoading(false);
						registerForm.reset();

						const url_before_login = new URLSearchParams(location.search).get("next");
						const isAuthorized = Object.values(routes).includes(url_before_login);

						history.push(isAuthorized ? url_before_login : routes.adminHomePage);
					});
				}
			})
			.catch((e) => {
				const msg = e?.request?.response
					? JSON.parse(e.request.response).message
					: e.message;
				setmessage(msg);
				setMessageType("ko");
				setLoading(false);
			});
	}

	return (
		<div className="login-container">
			<div className="container-left">
				<img alt="loading" src="../img/login1.jpg" />
			</div>
			<div className="container-right">
				<div className="login">
					<Link to="/">
						<img alt="loading" src="../img/Group73.png"></img>
					</Link>
					<div className="login-title">C'est parti !</div>
					<form onSubmit={loginLogic}>
						<input type="email" placeholder="Adresse e-mail" name="email" required />
						<input type="password" placeholder="Mot de passe" name="password" required autocompele="on" />
						{message && <div className={"alert-message " + messageType}>{message}</div>}
						<button type="submit" disabled={loading} className="btn btn-submit">
							Connexion
            </button>
					</form>
					<div className="links">
						<Link className="login-link" to={routes.adminForgotPassword}>
							Mot de passe oublié ?
            </Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link className="login-link" to={routes.adminRegisterProPage}>
							Demande de partenariat ?
            </Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;