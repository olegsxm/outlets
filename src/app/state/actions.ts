// Products
import {IProduct} from '../shared/models/product.model';

export class AddProduct {
  static readonly type = '[Product] Add';
  constructor(public payload: IProduct) {}
}

export class UpdateProduct {
  static readonly type = '[Product] Update';
  constructor(public payload: IProduct) {}
}

export class CreateProduct {
  static readonly type = '[Product] Create';
  constructor() {}
}

export class DeleteProducts {
  static readonly type = '[Product] Delete';
  constructor(public payload: number[]) {}
}
