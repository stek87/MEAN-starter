import * as express from 'express';
import {AuthRequest} from "./interfaces/AuthRequest";
import {AccountDto} from "../../application/dto/AccountDto";
import {AuthenticationApplicationService} from "../../application/AuthenticationApplicationService";

export class AuthenticationController {

  public authenticate(req: express.Request, res: express.Response) {
    let authRequest: AuthRequest = <AuthRequest>req.body;
    let authenticationService = new AuthenticationApplicationService();

    authenticationService.authenticate(
      authRequest.email,
      authRequest.password,
      (error: any) => {
        res.statusCode = 401;
        res.json(error);
      },
      (account: AccountDto) => {
        res.setHeader('X-Auth-Token', account.token);
        res.json(account);
      }
    )
  }
}