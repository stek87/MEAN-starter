import {AccountRepository} from "../adapter/repository/AccountRepository";
import {AccountApplicationInterface} from "./interfaces/AccountAdapterInteface";
import {AccountDto} from "./dto/AccountDto";
import {AccountModel} from "../model/account/AccountModel";
import {Roles} from "../model/account/Roles";
import * as EmailValidator from 'email-validator';
import {PasswordManager} from "../model/password/PasswordManager";

export class AccountApplicationService implements AccountApplicationInterface {

  private accountRepository: AccountRepository;

  constructor () {
    this.accountRepository = new AccountRepository();
  }

  public create (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    error: (error: any) => void,
    success: (result: AccountDto) => void
  ): void {
    if (!(firstName && lastName && email && password)){
      error({'error': 'All fields are mandatory'});
      return;
    }

    if (!EmailValidator.validate(email)) {
      error({'message': 'Email is not valid'});

      return;
    }


    this.accountRepository.findUnique('email', email, (err, res: AccountModel[]) => {
      if (err) {
        error({'error': 'error'});
        return;
      }

      if (res.length > 0) {
        error({'message': 'Email already exists'});

        return;
      } else {
        let account: AccountModel = AccountModel.of(
          firstName,
          lastName,
          email,
          PasswordManager.encodePassword(password, email)
        );

        account.role = Roles.USER;

        this.accountRepository.create(account, (err, res) => {
          if (err) {
            error(err);
            return;
          }

          if (res) {
            success(AccountDto.fromAccount(res));
          }
        });
      }
    });
  }

  public get(
    role: Roles,
    error: (error: any) => void,
    success: (result: AccountDto[]) => void
  ): void {
    if (role === Roles.USER) {
      error({'message': "You do not have permission!"});

      return;
    }

    this.accountRepository.get((err, res) => {
      if (err) {
        error(err);

        return;
      }

      if (res) {
        if (role === Roles.ADMIN) {
          success(AccountDto.fromAccounts(res));

          return;
        }

        if (role === Roles.MANAGER) {
          let allowedAccounts: AccountModel[] = [];

          for (let i = 0; i < res.length; i++) {
            if (res[i].role === Roles.USER) {
              allowedAccounts.push(res[i]);
            }
          }
          success(AccountDto.fromAccounts(allowedAccounts));
        }
      }
    });
  }

  public update(
    accountRole: Roles,
    id: string,
    firstName: string,
    lastName: string,
    role: string,
    error: (error: any) => void,
    success: (result: AccountDto) => void
  ): void {
    if (accountRole === Roles.USER) {
      error({'message': 'You do not have permission!'});

      return;
    }

    this.accountRepository.findById(
      id,
      (err, result) => {
        if (err) {
          error(err);

          return;
        }

        if (result) {
          if (AccountApplicationService.hasSuperiorityOver(accountRole, result.role)) {
            result.firstName = firstName;
            result.lastName = lastName;

            if (
              (accountRole === Roles.MANAGER && role !== 'ADMIN') ||
              accountRole === Roles.ADMIN
            ) {
              if (Roles[role]) {
                result.role = Roles[role];
              } else {
                error({'message': 'Role ' + '\'' + role + '\'' + ' is not supported'})

                return;
              }
            } else {
              error({'message': 'You do not have permission!'});

              return;
            }

            this.accountRepository.update(result.id, result, (err, res) => {

              if (err) {
                error(err);

                return;
              }

              if (res) {
                success(AccountDto.fromAccount(result));

                return;
              }
            })
          } else {
            error({'message': 'You do not have permission!'});
          }
        }
      });
  }

  public delete(
    role: Roles,
    _id: string,
    error: (err: any) => void,
    success: (result: any) => void
  ): void {
    if (role === Roles.USER) {
      error({'message': 'You do not have permission!'});

      return;
    }

    this.accountRepository.findById(_id, (err, res) => {
      if (err) {
        error(err);

        return;
      }

      if (AccountApplicationService.hasSuperiorityOver(role, res.role)) {
        this.accountRepository.delete(_id , (err, res) => {
          if (err) {
            error(err);

            return;
          }

          success(res);
        });

        return;
      }

      error({'message': 'You do not have permission!'});
    });
  }

  public findById(
    role: Roles,
    _id: string,
    error: (error: any) => void,
    success: (result: AccountDto) => void
  ): void {
    if (role === Roles.USER) {
      error({'message': 'You do not have permission!'});

      return;
    }

    this.accountRepository.findById(_id, (err, res) => {
      if (err) {
        error(err);

        return;
      }

      if (AccountApplicationService.hasSuperiorityOver(role, res.role)) {
        success(AccountDto.fromAccount(res));

        return;
      }

      error({'message': 'You do not have permission!'});

    });
  }

  private static hasSuperiorityOver(role: Roles, otherRole: Roles): boolean {
    if (role === Roles.ADMIN) {
      return true;
    }

    return role === Roles.MANAGER && !(otherRole === Roles.ADMIN || otherRole === Roles.MANAGER);
  }
}
