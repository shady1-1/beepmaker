import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logout from '../../../helper/logout';

import "./home.css";
import routes from "../../../routes";

const HomePage = () => {

	const [imageURL, setImageURL] = useState("");
	const history = useHistory();

	useEffect(() => {
		const { imageURL } = JSON.parse(localStorage.getItem("user"));
		setImageURL(imageURL ? `${imageURL}` : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
	}, []);

	return <>
		<div className="home-container">
			<div className="home-content">
				<div className="restaurant-logo">
					<img alt="loading" src={'/api/restaurant/serveimg/'+imageURL} ></img>
				</div>
				<div className="btn-items">
					<div className="item item-1">
						<img alt="loading" src="../img/treasure-chest.png"></img>
						<span>Points de fidélité</span>
					</div>
					<Link className="item item-2" to="/restaurant/admin/Menu"  >
						<img alt="loading" src="../img/Menu.png"></img>
						<span>Menu</span>
					</Link>
					<Link className="item item-3" to="/restaurant/admin/beeps" >
						<div className="item-3-container" >
							<div className="red-circle"></div>
							<img alt="loading" src="../img/Group3.png"></img>
						</div>
						<span>Beeper</span>
					</Link>
					<Link className="item item-4" to="/restaurant/parameter/account">
						<img alt="loading" src="../img/settings.png"></img>
						<span>Paramètre</span>
					</Link>
				</div>
				<div className="home-footer">
					<Link href="#" className="home-logo" to="/">
						<img alt="loading" src="../img/Group73.png"></img>
					</Link>
					<div className="home-logout-container">
						<div className="home-logout" onClick={() => logout(() => { history.push("/") })}>Déconnexion</div>
					</div>
				</div>
			</div>
		</div>
	</>;
};

export default HomePage;
