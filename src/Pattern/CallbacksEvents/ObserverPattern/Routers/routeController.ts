class RouteController {
  constructor() {}

  mainPageController(req: any, res: any) {
    res.end("Main Page");
  }
  asPageController(req: any, res: any) {
    res.end("As page");
  }
}

export default new RouteController();
