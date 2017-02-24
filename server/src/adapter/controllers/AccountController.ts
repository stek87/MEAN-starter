import { AbstractController } from './AbstractController';
import {AccountApplicationService} from "../../application/AccountApplicationService";
import {AccountModel} from "../../model/account/AccountModel";
import {RegisterRequest} from "./interfaces/RegisterRequest";
import {XAuthTokenService} from "../../model/XAuth/XAuthTokenService";
import {Request} from "express";
import {Response} from "express";
import {UpdateRequest} from "./interfaces/UpdateRequest";

export class AccountController implements AbstractController<AccountApplicationService> {

  public create(req: Request, res: Response): void {
    try {
      let registerRequest: RegisterRequest = new AccountModel(req.body);
      let accountService = new AccountApplicationService();

      accountService.create(
        registerRequest.firstName,
        registerRequest.lastName,
        registerRequest.email,
        registerRequest.password,
        (error) => {
          res.statusCode = 400;
          res.json(error);
        },
        (success) => {
          res.json(success);
        }
      );
    } catch (e)  {
      console.log(e);
      res.json({error: "error in your request"});
    }
  }

  public update(req: Request, res: Response): void {
    try {
      let account: UpdateRequest = <UpdateRequest>req.body;
      let token: string = req.headers['x-auth-token'];
      let _id: string = req.params._id;

      if (token) {
        XAuthTokenService.validateToken(token, (err, decoded) => {
          if (err) {
            res.statusCode = 403;
            res.json({success: false, message: 'Failed to authenticate token.'});
          } else {
            let accountService = new AccountApplicationService();

            accountService.update(
              decoded.role,
              _id,
              account.firstName,
              account.lastName,
              account.role,
              (error) => {
                res.statusCode = 403;
                res.json(error);
              },
              (result) => {
                res.json(result);
              }
            );
          }
        });
      } else {
        res.statusCode = 403;
        res.send({
          success: false,
          message: 'No token provided.'
        });
      }
    } catch (e)  {
      console.log(e);
      res.json({error: "error in your request"});
    }
  }

  public delete(req: Request, res: Response): void {
    try {
      let _id: string = req.params._id;
      let token: string = req.headers['x-auth-token'];

      if (token) {
        XAuthTokenService.validateToken(token, (err, decoded) => {
          if (err) {
            res.statusCode = 403;
            res.json({success: false, message: 'Failed to authenticate token.'});
          } else {
              let accountService = new AccountApplicationService();
              accountService.delete(
                decoded.role,
                _id,
                (error) => {
                  res.statusCode = 403;
                  res.send(error);
                },
                () => {
                  res.statusCode = 204;
                  res.send({success: "success"});
                }
              );
          }
        });
      } else {
        res.statusCode = 403;
        res.send({
          success: false,
          message: 'No token provided.'
        });
      }
    } catch (e)  {
      console.log(e);
      res.statusCode = 400;
      res.send({"error": "error in your request"});
    }
  }

  public get(req: Request, res: Response) {
    try {
      let token: string = req.headers['x-auth-token'];

      if (token) {
        XAuthTokenService.validateToken(token, (err, decoded) => {
          if (err) {
            res.statusCode = 403;
            res.json({success: false, message: 'Failed to authenticate token.'});
          } else {


              let accountService: AccountApplicationService = new AccountApplicationService();

              accountService.get(decoded.role, (error) => {
                  res.send(error);
                },
                (success) => {
                  res.send(success);
                });

          }
        });
      } else {
        res.statusCode = 403;
        res.send({
          success: false,
          message: 'No token provided.'
        });
      }
    } catch (e) {
      console.log(e);
      res.send({"error": "error in your request"});
    }
  }

  public findById(req: Request, res: Response): void {
    try {
      let _id: string = req.params._id;
      let token: string = req.headers['x-auth-token'];

      if (token) {
        XAuthTokenService.validateToken(token, (err, decoded) => {

          if (err) {
            res.statusCode = 403;
            res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            let accountService = new AccountApplicationService();

              accountService.findById(
                decoded.role,
                _id,
                (error) => {
                  res.statusCode = 403;
                  res.send(error);
                },
                (result) => {
                  res.send(result);
              });

          }
        })
      } else {
          res.statusCode = 403;
          res.send({
            success: false,
            message: 'No token provided.'
          });
        }
    } catch (e) {
      console.log(e);
      res.send({"error": "error in your request"});
    }
  }
}
