import * as jwt from 'jsonwebtoken';
import {Roles} from "../account/Roles";
let config = require('../../../../server/config/config');

export class XAuthTokenFactory {

  public static create(email: string, role: Roles) {
    return jwt.sign(
      {
        email: email,
        role: role,
        exp: config.expiryDate
      },
      config.tokenKey);
  }
}