import * as express from 'express';

export interface ReadController {
  get: express.RequestHandler;
  findById: express.RequestHandler;
}