export interface Read<T> {
  get: (callback: (error: any, result: T[])=> void)=> void;
  findById: (id: string, callback: (error:any, result: T) => void, type: any) => void;
}