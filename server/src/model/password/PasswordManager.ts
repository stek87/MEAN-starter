import {pbkdf2Sync} from "crypto";
let config = require('../../../../server/config/config');

export class PasswordManager {

  public static encodePassword(password: string, email: string): string {
    return pbkdf2Sync(
      password,
      email.split('').reverse().join(config.passwordPepper),
      1000,
      64
    ).toString('hex');
  }

  public static isPasswordValid(
    email: string,
    rawPassword: string,
    encodedPassword: string
  ): boolean {
    return encodedPassword === this.encodePassword(rawPassword, email);
  }
}
