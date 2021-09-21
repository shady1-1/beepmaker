import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "../index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(false);

  const homeRedirection = {
    admin: routes.adminHomePage,
    superAdmin: routes.superAdminHomePage,
  };

  const connect = async (_token) => {
    return await axios({
      url: localStorage.getItem("admin-token")
        ? "/api/admin/connect"
        : "/api/restaurant/admin/connect",
      method: "GET",
      headers: {
        Authorization: `auth-token:${_token}`,
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    const _token_admin = localStorage.getItem("token");
    const _token_superAdmin = localStorage.getItem("admin-token");

    if (_token_admin) {
      setRole("admin");
    } else if (_token_superAdmin) {
      setRole("superAdmin");
    }

    const token = _token_admin || _token_superAdmin;

    if (token) {
      async function fetchData() {
        await connect(token)
          .then((res) => {
            if (res.data.success === false) {
              setIsAuthenticated(false);
              localStorage.removeItem("token");
              localStorage.removeItem("admin-token");
            } else {
              setIsAuthenticated(true);
            }
            setIsLoading(false);
          })
          .catch((e) => {});
      }
      fetchData();
    } else {
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) return <></>;

        if (isAuthenticated) {
          if (rest.requiredRole === role) return <Component {...props} />;
          return (
            <Redirect
              to={{
                pathname: homeRedirection[role],
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        return (
          <Redirect
            to={{
              pathname:
                rest.requiredRole === "admin"
                  ? routes.adminLoginPage
                  : routes.superAdminLoginPage,
              search:
                rest.path.toLowerCase() ===
                props.location.pathname.toLowerCase()
                  ? `?next=${rest.path}`
                  : false,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
