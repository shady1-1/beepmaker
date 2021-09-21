import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import routes from "./routes/index";
import ClientPage2 from "./views/Client/ClientBeep";
import ClientPage3 from "./views/Client/ClientMenu";
import clientRoutes from "./routes/client";

const SuperAdminLoginPage = lazy(() => import("./views/SuperAdmin/Login"));
const SuperAdminHomePage = lazy(() => import("./views/SuperAdmin/Home"));
const SuperAdminRestaurantsPage = lazy(() =>
  import("./views/SuperAdmin/Restaurants")
);
const SuperAdminManagePage = lazy(() => import("./views/SuperAdmin/Manage"));

const RegisterPage = lazy(() => import("./views/Admin/Register"));
const LoginPage = lazy(() => import("./views/Admin/Login"));
const ForgotPasswordPage = lazy(() => import("./views/Admin/ForgotPassword"));
const ResetPasswordPage = lazy(() => import("./views/Admin/ResetPassword"));

const AdminHomePage = lazy(() => import("./views/Admin/Home"));
const AdminAccountPage = lazy(() => import("./views/Admin/Parameters/Account"));
const AdminLogoPage = lazy(() => import("./views/Admin/Parameters/Logo"));

/**********/
const AdminMenuPage = lazy(() => import("./views/Admin/Menu"));
/**********/


const AdminQRCode = lazy(() => import("./views/Admin/Parameters/QRCode"));
const AdminConfidentialityPage = lazy(() =>
  import("./views/Admin/Parameters/Confidentiality")
);
const AdminPaymentPage = lazy(() => import("./views/Admin/Parameters/Payment"));

const BipsList = lazy(() => import("./views/Admin/BeepList"));

const NotFoundPage = lazy(() => import("./views/_NotFound"));

export default function App() {
  window.OneSignal = window.OneSignal || [];
  //const OneSignal = window.OneSignal;
  return (
    <Router>
      <Suspense
        fallback={
          <div className="container-loader">
            <div className="loader"></div>
          </div>
        }
      >
        <Switch>
          <PublicRoute
            path="/"
            exact
            component={RegisterPage}
            restricted={true}
          />

          <PublicRoute
            path={routes.superAdminLoginPage}
            exact
            component={SuperAdminLoginPage}
            restricted={true}
          />
          <PrivateRoute
            path={routes.superAdminHomePage}
            exact
            component={SuperAdminHomePage}
            requiredRole="superAdmin"
          />
          <PrivateRoute
            path={routes.superAdminRestaurantsPage}
            exact
            component={SuperAdminRestaurantsPage}
            requiredRole="superAdmin"
          />
          <PrivateRoute
            path={routes.superAdminManagePage}
            exact
            component={SuperAdminManagePage}
            requiredRole="superAdmin"
          />

          <PublicRoute
            path={routes.adminRegisterPage}
            exact
            component={RegisterPage}
            restricted={true}
            type="register"
          />
          <PublicRoute
            path={routes.adminRegisterProPage}
            exact
            component={RegisterPage}
            restricted={true}
            type="pro"
          />
          <PublicRoute
            path={routes.adminLoginPage}
            exact
            component={LoginPage}
            restricted={true}
          />

          <PublicRoute
            path={routes.adminForgotPassword}
            exact
            component={ForgotPasswordPage}
            restricted={true}
          />
          <PublicRoute
            path={routes.adminResetPassword}
            exact
            component={ResetPasswordPage}
            restricted={true}
          />
          <PublicRoute
            path={routes.ClientRoute}
            exact
            component={ClientPage2}
            restricted={true}
          />
          <PublicRoute
              path={routes.ClientMenu}
              exact
              component={ClientPage3}
              restricted={true}
          />
          <PrivateRoute
            path={routes.adminHomePage}
            exact
            component={AdminHomePage}
            requiredRole="admin"
          />
          <PrivateRoute
              path={routes.adminMenuPage}
              exact
              component={AdminMenuPage}
              requiredRole="admin"
          />
          <PrivateRoute
            path={routes.adminAccountPage}
            exact
            component={AdminAccountPage}
            requiredRole="admin"
          />
          <PrivateRoute
            path={routes.adminLogoPage}
            exact
            component={AdminLogoPage}
            requiredRole="admin"
          />

          <PrivateRoute
            path={routes.adminConfidentialityPage}
            exact
            component={AdminConfidentialityPage}
            requiredRole="admin"
          />
          <PrivateRoute
            path={routes.adminPaymentPage}
            exact
            component={AdminPaymentPage}
            requiredRole="admin"
          />
          <PrivateRoute
            path={routes.adminQRCode}
            exact
            component={AdminQRCode}
            requiredRole="admin"
          />
          <PrivateRoute
            path={routes.adminBeeps}
            component={BipsList}
            requiredRole="admin"
          />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}
