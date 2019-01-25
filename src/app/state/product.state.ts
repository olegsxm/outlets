import {IProduct} from '../shared/models/product.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AddProduct, AddProducts, CreateProduct, DeleteProducts, UpdateProduct} from './actions';

export class ProductStateModel {
  products: IProduct[];
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: []
  }
})
export class ProductState {
  @Selector()
  static getProducts(state: ProductStateModel) {
    return state.products;
  }

  @Selector()
  static getProduct(state: ProductStateModel) {
    return (id: number) => state.products.find(product => product.id === id);
  }

  @Action(AddProducts)
  addAll({getState, patchState }: StateContext<ProductStateModel>, { payload }: AddProducts) {
    patchState({
      products: payload
    });
  }

  @Action(AddProduct)
  add({getState, patchState }: StateContext<ProductStateModel>, { payload }: AddProduct) {
    const state = getState();
    patchState({
      products: [...state.products, payload]
    });
  }

  @Action(UpdateProduct)
  update({getState, patchState }: StateContext<ProductStateModel>, { payload }: AddProduct) {
    patchState({
      products: getState().products.map(product => product.id === payload.id ? payload : product)
    });
  }

  @Action(CreateProduct)
  create({getState, patchState }: StateContext<ProductStateModel>) {
    const state = getState();
    const id = getState().products[state.products.length - 1].id + 1;
    patchState({
      products: [...getState().products, {
        id: id,
        name: 'name',
        categories: [10],
        price: 0,
        quantity: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Empty_set.svg/1024px-Empty_set.svg.png'
      }]
    });
  }

  @Action(DeleteProducts)
  delete({getState, patchState }: StateContext<ProductStateModel>, {payload}: DeleteProducts) {
    const state: IProduct[] = [];
    getState().products.forEach(product => {
      if (payload.indexOf(product.id) === -1) {
        state.push(product);
      }
    });
    patchState({
      products: state
    });
  }
}
