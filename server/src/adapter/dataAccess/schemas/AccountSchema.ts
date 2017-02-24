import { DataAccess } from '../DataAccess';
import {Document} from 'mongoose';
import {Model} from "mongoose";

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

export interface AccountDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class Account {

  public static get schema() {
    return mongoose.Schema({
      firstName : {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        unique: true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true
      }
    });
  }
}

export const AccountSchema: Model<Document> =
  mongooseConnection.model<AccountDocument>("accounts", Account.schema);