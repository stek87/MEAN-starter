import {AccountModel} from "../../model/account/AccountModel";
import {Types} from "mongoose";
import {Roles} from "../../model/account/Roles";

export class AccountDto {

  public id: Types.ObjectId;
  public email: string;
  public firstName: string;
  public lastName: string;
  public token: string;
  public role: Roles;

  constructor(account: AccountModel, token?: string) {
    this.id = account.id;
    this.email = account.email;
    this.firstName = account.firstName;
    this.lastName = account.lastName;
    this.role = account.role;

    if (token) {
      this.token = token;
    }
  }

  public static fromAccountAndToken(
    account: AccountModel,
    token: string
  ): AccountDto {
    return new AccountDto(account, token);
  }

  public static fromAccount(
    account: AccountModel
  ): AccountDto {
    return new AccountDto(account);
  }

  public static fromAccounts(accounts: AccountModel[]): AccountDto[] {
    let accountsDto: AccountDto[] = [];

    for (let i = 0; i < accounts.length; i++) {
      accountsDto.push(AccountDto.fromAccount(accounts[i]));
    }

    return accountsDto;
  }
}