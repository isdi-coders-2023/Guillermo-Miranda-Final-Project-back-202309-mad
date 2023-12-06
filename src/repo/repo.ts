/* eslint-disable no-unused-vars */
export interface Repository <X extends {id:unknown}> {
  getAll():Promise<X[]>;
  getById(_id: X['id']):Promise<X>;
  // Search({ key, value }: { key: keyof X; value: unknown }): Promise<X[]>;
  create(_newItem:Omit<X,'id'>):Promise<X>;
  update(_id:X['id'], _updatedItem: Partial<X>):Promise<X>;
  // Delete(_id:X['id']): Promise<void>
}
