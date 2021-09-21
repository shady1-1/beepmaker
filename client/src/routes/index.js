import restaurantRoutes from "./restaurant";
import superAdminRoutes from "./superAdmin";
import clientRoutes from "./client";

const routes = {
  ...superAdminRoutes,
  ...restaurantRoutes,
  ...clientRoutes,
};
export default routes;
