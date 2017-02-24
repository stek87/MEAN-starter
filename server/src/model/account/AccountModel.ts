import {Types} from "mongoose";
import {Roles} from "./Roles";

export class AccountModel {

  public id: Types.ObjectId;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public role: Roles;

  constructor(
    obj: any
  ) {
    this.id = obj && obj.id;
    this.firstName = obj && obj.firstName;
    this.lastName = obj && obj.lastName;
    this.email = obj && obj.email;
    this.password = obj && obj.password;
    this.role = obj && obj.role;
  }

  public static of (firstName: string, lastName: string, email: string, password: string) {
    return new AccountModel(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }
    );
  }

  public hasPrivilegesOverAccount(otherAccount: AccountModel): boolean {
    if (this.role === Roles.ADMIN) {
      return true;
    }

    if (this.role === Roles.MANAGER) {
      return otherAccount.role !== Roles.ADMIN;
    }

    return false;
  }
}
