import { AccountSchema } from '../dataAccess/schemas/AccountSchema';
import { RepositoryBase } from './AbstractRepository';
import {AccountDbo} from "../dataAccess/dbo/AccountDbo";
import {AccountModel} from "../../model/account/AccountModel";

export class AccountRepository extends RepositoryBase<AccountDbo, AccountModel> {
  constructor () {
    super();
  }

  documentModel() {
    return AccountSchema;
  }

  public findUnique(
    criterion: string,
    value: string,
    callback: (error: any, result: AccountModel[]) => void
  ) {
    super.findUnique(criterion, value, callback, AccountDbo);
  }

  public findById(_id: string, callback: (error: any, result: AccountModel) => void) {
    super.findById(_id, callback, AccountDbo);
  }
}
