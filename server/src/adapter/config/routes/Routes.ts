import * as express from 'express';
import { AccountsRoutes } from './AccountsRoutes';
import {AuthenticateRoutes} from "./AuthenticationRoutes";

export class Routes {

  private app: express.Application;

  constructor() {
    this.app = express();
  }

  get routes(): express.Application {

    this.app.use("/", new AccountsRoutes().routes);
    this.app.use("/", new AuthenticateRoutes().routes);

    return this.app;
  }
}
