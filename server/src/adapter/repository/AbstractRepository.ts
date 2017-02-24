import { Read } from './interfaces/Read';
import { Write } from './interfaces/Write';
import {Document} from 'mongoose';
import {Model} from 'mongoose';
import {Types} from 'mongoose';
import {AbstractDbo} from "../dataAccess/dbo/AbstractDbo";

export abstract class RepositoryBase<T extends AbstractDbo<E>, E> implements Read<E>, Write<E> {

  abstract documentModel(): Model<Document>;

  private _model: Model<Document>;

  constructor () {
    this._model = this.documentModel();
  }

  public create(item: E, callback: (error: any, result: E) => void) {
    this._model.create(item, callback).end();
  }

  public get(callback: (error: any, result: E[]) => void) {
    this._model.find({}, callback);
  }

  public update(
    _id: Types.ObjectId,
    item: E,
    callback: (error: any, result: any) => void)
  {
    this._model.update({_id: _id}, item, callback);
  }

  public delete(_id: string, callback:(error: any, result: any) => void) {
    this._model.remove({_id: RepositoryBase.toObjectId(_id)}, (err) => callback(err, null));
  }

  public findById(_id: string, callback: (error: any, result: E) => void, type) {
    this._model.findById( _id, (err: any, res: T) => {
      if (err) {
        callback(err, null);

        return;
      }

      callback(err, new type(res).toEntity())
    });
  }

  public findUnique(
    criterion: string,
    value: string,
    callback: (error: any, result: E[]) => void,
    type: any
  ): void {
    let query = {};
    query[criterion] = value;

    this._model.find(query, (err: any, res: T[]) => {
      if (err) {
        callback(err, []);

        return;
      }

      if (res) {
        let itemList = [];

        for (let i = 0; i < res.length; i++) {
          itemList.push((new type(res[i])).toEntity());
        }

        callback(err, itemList);

        return;
      } else {
        callback({message: "Something went wrong"}, [])
      }
    });
  }

  private static toObjectId (_id: string) : Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}