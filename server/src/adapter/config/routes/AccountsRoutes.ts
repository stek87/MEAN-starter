import * as express from 'express';
import {AccountController} from "../../controllers/AccountController";

export class AccountsRoutes {

  private _accountController: AccountController;

  constructor () {
    this._accountController = new AccountController();
  }

  public get routes (): express.Router {
    let router = express.Router();

    router.post("/accounts", this._accountController.create);
    router.get("/accounts", this._accountController.get);
    router.put("/accounts/:_id", this._accountController.update);
    router.get("/accounts/:_id", this._accountController.findById);
    router.delete("/accounts/:_id", this._accountController.delete);

    return router;
  }
}
