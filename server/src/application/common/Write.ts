import {Roles} from "../../model/account/Roles";
export interface Write<T> {
  create: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    error: (error: any) => void,
    success: (result: any ) => void
  ) => void;
  update:(
    accountRole: Roles,
    _id: string,
    firstName: string,
    lastName: string,
    role: string,
    error: (error: any) => void,
    success:(result: any) => void
  ) => void;
  delete: (
    role: Roles,
    _id: string,
    error: (error: any) => void,
    success:( result: any) => void
  ) => void;
}
