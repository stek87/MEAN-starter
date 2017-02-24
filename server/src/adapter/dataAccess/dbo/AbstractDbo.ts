import {Document} from 'mongoose';
import {Model} from "mongoose";

export abstract class AbstractDbo<T> {

  public abstract toEntity(): T;

  public abstract fromEntity(entity: T);

  public abstract documentModel(): Model<Document>;
}