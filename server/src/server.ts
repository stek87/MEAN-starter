/// <reference path="../typings/index.d.ts" />

"use strict";

let morgan = require('morgan');
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './adapter/config/routes/Routes';
import * as path from 'path';

export class ServerApp {

  public app: express.Application;
  public port: number = process.env.PORT || 3000;
  public env: string = process.env.NODE_ENV || 'development';

  constructor() {
    this.app = express();

    this.config();
  }

  public static bootstrap(): ServerApp {
    return new ServerApp();
  }

  private config() {
    this.app.set('port', this.port);

    this.app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
    this.app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));

    this.app.use(express.static(path.resolve(__dirname, '../client')));
    this.app.use(express.static(path.resolve(__dirname, '../../node_modules')));

    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use('/api', new Routes().routes);

    let renderIndex = (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve(__dirname, '../client/index.html'));
    };

    this.app.get('/*', renderIndex);

    if(this.env === 'development'){
      this.app.use(
        function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
          res.status(err.status || 500);
          res.json({
            error: err,
            message: err.message
          });
          next(err)
        }
      );
    }


    // catch 404 and forward to error handler
    this.app.use(function(req: express.Request, res: express.Response, next) {
      let err = new Error("Not Found");
      next(err);
    });

    // production error handler
    // no stacktrace leaked to user
    this.app.use(
      function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
          error: {},
          message: err.message
        });
        next(err);
      }
    );
  }
}
