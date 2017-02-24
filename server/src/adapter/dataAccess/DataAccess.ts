import * as mongoose from 'mongoose';
import { Constants } from '../config/constants/constants';

export class DataAccess {

  static mongooseInstance: any;
  static mongooseConnection: mongoose.Connection;

  constructor () {}

  public static connect(): mongoose.Connection {
    if(this.mongooseInstance) {
      return this.mongooseInstance;
    }

    this.mongooseConnection  = mongoose.connection;
    this.mongooseConnection.once("open", () => {
      console.log("Connected to mongodb.");
    });

    this.mongooseInstance = mongoose.connect(Constants.DB_CONNECTION_STRING);
    return this.mongooseInstance;
  }
}

DataAccess.connect();
