import routeController from "./routeController";
type Route = {
  path: string;
  callback: (req: any, res: any) => void;
};
const routes: Route[] = [];
export const route = (path: string, cb: (req: any, res: any) => void) => {
  routes.push({ path: path, callback: cb });
};
const routeHandler = (url: string | undefined, req: any, res: any) => {
  // Check the url with routes

  if (url) {
    const targetedRoute = routes.find((route) => {
      return route.path === url;
    });
    targetedRoute?.callback(req, res);
    return;
  }
};

const { mainPageController, asPageController } = routeController;

// Route List
route("/", mainPageController);
route("/as", asPageController);

export default routeHandler;
