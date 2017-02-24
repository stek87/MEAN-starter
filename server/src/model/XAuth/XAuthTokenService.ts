import * as jwt from 'jsonwebtoken';
import {AccountModel} from "../account/AccountModel";
import {AccountRepository} from "../../adapter/repository/AccountRepository";
import {AccountDbo} from "../../adapter/dataAccess/dbo/AccountDbo";
import {Roles} from "../account/Roles";
let config = require('../../../../server/config/config');

export class XAuthTokenService {

  public static validateToken(token: string, callback: (error: any, success: any) => void): void {
    jwt.verify(token, config.tokenKey, function (err, decoded) {
      callback(err, decoded);
    });
  }

  public static getEmailAddressFromToken(token: string, callback: (email: string) => void): void {
    jwt.verify(token, config.tokenKey, function (err, decoded) {
      return callback(decoded.email);
    });
  }

  public static getRoleFromToken(token: string, callback: (role: Roles) => void): void {
    jwt.verify(token, config.tokenKey, function (err, decoded) {
      return callback(decoded.role);
    });
  }

  public static getAccountFromToken(
    email: string,
    error: (error: any) => void,
    res: (account: AccountModel) => void
  ): void {
    let accountRepository = new AccountRepository();

    if (email) {
      accountRepository.findUnique('email', email, (err, success: AccountModel[]) => {
        if (success) {
          res(success[0]);
        }

        if (err) {
          error(err);
        }
      });
    }
  }
}
