import { AccountModel } from "../../../model/account/AccountModel";
import { Types } from "mongoose";
import {AbstractDbo} from "./AbstractDbo";
import {Document} from 'mongoose';
import {AccountSchema} from "../schemas/AccountSchema";
import {Model} from "mongoose";
import {Roles} from "../../../model/account/Roles";

export class AccountDbo extends AbstractDbo<AccountModel> {

  public id: Types.ObjectId;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public role: string;

  constructor(
    obj: any
  ) {
    super();
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.password = obj.password;
    this.role = obj.role;
  }

  public static fromAccount(account: AccountModel) {
    return  new AccountDbo(account);
  }

  public toEntity(): AccountModel {
    return new AccountModel(this);
  }

  public documentModel(): Model<Document> {
    return AccountSchema;
  }

  public fromEntity(account: AccountModel) {
    return AccountDbo.fromAccount(account);
  }
}