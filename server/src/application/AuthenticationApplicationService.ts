import {AuthenticationService} from "../model/account/AuthenticationService";
import {AccountDto} from "./dto/AccountDto";
import {AccountModel} from "../model/account/AccountModel";
import {XAuthTokenFactory} from "../model/XAuth/XAuthTokenFactory";
import * as EmailValidator from 'email-validator';
import {AccountRepository} from "../adapter/repository/AccountRepository";
import {PasswordManager} from "../model/password/PasswordManager";

export class AuthenticationApplicationService implements AuthenticationService {

  private _accountRepository: AccountRepository;

  constructor () {
    this._accountRepository = new AccountRepository();
  }

  public authenticate(
    email: string,
    password: string,
    error: (error: any) => void,
    success: (account: AccountDto) => void
  ): void {

    if (!EmailValidator.validate(email)) {
      error({'message': 'Email is not valid'});

      return;
    }

    this._accountRepository.findUnique('email', email, (err, res: AccountModel[]) => {

        if (err) {
          error(err);

          return;
        }

        if (res.length === 0) {
          error({'message': 'Your email is not registered'});

          return;
        }

        if (res.length > 1) {
          error({'message': 'incorrect email'});

          return;
        }


        if (res) {
          let account: AccountModel = res[0];
          let token: string = XAuthTokenFactory.create(account.email, account.role);

          if (PasswordManager.isPasswordValid(email, password, account.password)) {
            success(AccountDto.fromAccountAndToken(account, token));
          } else {
            error({'message': 'Incorrect password'});
          }
        }

        return;
      });
  }
}