import * as express from 'express';
import {AccountController} from "../../controllers/AccountController";
import {AuthenticationController} from "../../controllers/AuthenticationController";

export class AuthenticateRoutes {

  private AuthenticationController: AuthenticationController;

  constructor () {
    this.AuthenticationController = new AuthenticationController();
  }

  public get routes (): express.Router {
    let router = express.Router();

    router.post("/authenticate", this.AuthenticationController.authenticate);

    return router;
  }
}
