import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../routes/superAdmin";

import "./restaurants.css";
import "../Home/home.css";

const SuperAdminRestaurantsPage = () => {
	const [restaurants, setRestaurants] = useState([]);
	const [actionLoading, setActionLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		validationMailSuperAdmin();
		setLoading(false);
	}, []);

	const validationMailSuperAdmin = async () => {
		await axios({
			url: "/api/admin/restaurant/list",
			method: "GET",
		})
			.then((res) => {
				setRestaurants(res.data.data);
			})
			.catch((err) => { });
	};
	const validateMail = async (_id) => {
		setActionLoading(true);
		await axios({
			url: `/api/admin/validate/mail/restaurant/${_id}`,
			method: "GET",
		}).then(async (r) => {
			await validationMailSuperAdmin();
			setActionLoading(false);
		});
	};
	const blockMail = async (_id) => {
		setActionLoading(true);
		await axios({
			url: `/api/admin/block/mail/restaurant/${_id}`,
			method: "GET",
		}).then(async (r) => {
			await validationMailSuperAdmin();
			setActionLoading(false);
		});
	};

	return (
		<>
			<div className="restaurants-container">
				<div className="restaurants-content">
					<div className="restaurants-logo">
						<img alt="loading" src="../img/Group73.png"></img>
					</div>
					<div className="super-admin">
						<Link className="btn-back" to={routes.superAdminHomePage}>
							<img alt="loading" src="../../img/btn-back.png"></img>
							<span>Retour</span>
						</Link>
						<div className="restaurants-btn-items">
							<table border="0" style={{ textAlign: "center" }}>
								<thead>
									<tr>
										<th></th>
										<th>Autorisé</th>
										<th>E-mail</th>
										<th>Nom et prénom</th>
										<th>Société</th>
										<th>Type de société</th>
										<th>Numéro de siret</th>
										<th>Adresse</th>
										<th>Téléphone</th>
									</tr>
								</thead>
								{!loading && (
									<tbody>
										{restaurants.map((e) => (
											<tr key={e.email}>
												<td style={{ width: "65px" }}>
													{e.isAuthorized ? (
														<button
															className="btn block-btn"
															disabled={actionLoading}
															onClick={() => blockMail(e._id)}
														>
															Block
														</button>
													) : (
														<button
															className="btn validate-btn"
															disabled={actionLoading}
															onClick={() => validateMail(e._id)}
														>
															Validate
														</button>
													)}
												</td>
												<td>{e.isAuthorized ? "✅" : "🚫"}</td>
												<td>
													{e.isVerified ? "✅" : "🚫"}&nbsp;{e.email}
												</td>
												<td>{e.restorer.fullname}</td>
												<td>{e.societyName}</td>
												<td>{e.fieldOfActivity}</td>
												<td>{e.siretNumber}</td>
												<td>{e.address}</td>
												<td>{e.phone}</td>
											</tr>
										))}
									</tbody>
								)}
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SuperAdminRestaurantsPage;