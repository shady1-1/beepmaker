import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "../index";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const [role, setRole] = useState(false);
  const [token, setToken] = useState();

  const homeRedirection = {
    admin: routes.adminHomePage,
    superAdmin: routes.superAdminHomePage,
  };

  const isLogin = () => {
    if (token) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const _token_admin = localStorage.getItem("token");
    const _token_superAdmin = localStorage.getItem("admin-token");

    if (_token_admin) {
      setToken(_token_admin);
      setRole("admin");
    } else if (_token_superAdmin) {
      setToken(_token_superAdmin);
      setRole("superAdmin");
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogin() && restricted) {
          return <Redirect to={homeRedirection[role]} />;
        }

        return <Component {...props} type={rest.type} />;
      }}
    />
  );
};

export default PublicRoute;
