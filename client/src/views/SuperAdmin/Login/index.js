import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

import routes from "../../../routes/superAdmin";

import "./login.css";

const LoginAdminPage = () => {
	const history = useHistory();
	const location = useLocation();

	const [message, setmessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const [loading, setLoading] = useState(false);

	async function loginLogic(e) {
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
			url: "/api/admin/login",
			method: "POST",
			data,
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				if (res.data.token) {
					setMessageType("ok");
					setmessage("Connexion success : Login ok");

					localStorage.setItem("admin-token", res.data.token);
					setLoading(false);

					const url_before_login = new URLSearchParams(location.search).get(
						"next"
					);
					const isAuthorized = Object.values(routes).includes(url_before_login);

					history.push(
						isAuthorized ? url_before_login : routes.superAdminHomePage
					);
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
				<img alt="loading" src="../img/login2.jpg" />
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
						{message && (
							<div className={"alert-message " + messageType}>{message}</div>
						)}
						<button type="submit" disabled={loading} className="btn btn-submit">
							Connexion
            </button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginAdminPage;