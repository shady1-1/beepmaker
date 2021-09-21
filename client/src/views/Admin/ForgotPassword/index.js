import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./forgot-password.css";

const ForgotPassword = () => {
	const [message, setmessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const [loading, setLoading] = useState(false);

	const loginLogic = async(e) => {
		e.preventDefault();
		setLoading(true);
		setmessage("");
		const resetPasswordForm = document.querySelector("form");
		const formData = new FormData(resetPasswordForm);

		const tmp = [];
		for (var value of formData.values()) tmp.push(value);

		const data = JSON.stringify({
			email: tmp.shift(),
			password: tmp.shift(),
		});

		await axios({
			url: "/api/restaurant/forgotPassword",
			method: "POST",
			data,
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				resetPasswordForm.reset();
				setmessage(res.data.message);
				setMessageType("ok");
				setLoading(false);
			})
			.catch((e) => {
				resetPasswordForm.reset();
				const msg = e?.request?.response
					? JSON.parse(e.request.response).message
					: e.message;
				setmessage(msg);
				setMessageType("ko");
				setLoading(false);
			});
	}

	return (
		<div className="forgotPassword-container">
			<div className="container-left">
				<img alt="loading" src="../img/login3.jpg" />
			</div>
			<div className="container-right">
				<div className="login">
					<Link to="/">
						<img alt="loading" src="../img/Group73.png"></img>
					</Link>
					<div className="login-title">Réinitialiser mot de passe</div>
					<form onSubmit={loginLogic}>
						<input type="email" placeholder="Votre adresse e-mail" name="email" required></input>
						{message && <div className={"alert-message "+messageType}>{message}</div>}
						<button type="submit" disabled={loading} className="btn btn-submit">
							Envoyer
            </button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
