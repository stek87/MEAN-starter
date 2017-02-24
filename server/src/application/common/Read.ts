import {Roles} from "../../model/account/Roles";
export interface Read<T> {
  get: (role: Roles, error: (error: any) => void, success: (result: any ) => void) => void ;
  findById: (
    role: Roles,
    _id: string,
    error: (error: any) => void,
    success: (result: any ) => void
  ) => void;
}