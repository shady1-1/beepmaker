import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import routes from "../../../routes/superAdmin";
import logout from "../../../helper/logout";

import "./home.css";

const SuperAdminHomePage = () => {
  const history = useHistory();

  return (
    <>
      <div className="superadmin-container">
        <div className="superadmin-content">
          <div className="superadmin-logo">
            <img alt="loading" src="../img/Group73.png"></img>
          </div>
          <div className="btn-items">
            <Link className="item item-2" to={routes.superAdminRestaurantsPage}>
              <img alt="loading" src="../img/Menu.png"></img>
              <span>Restaurants</span>
            </Link>
          </div>
          <div className="home-footer">
            <Link href="#" className="home-logo" to="/">
              <img alt="loading" src="../img/Group73.png"></img>
            </Link>
            <div className="home-logout-container">
              <div
                className="home-logout"
                onClick={() =>
                  logout(() => {
                    history.push("/");
                  })
                }
              >
                Déconnexion
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminHomePage;
