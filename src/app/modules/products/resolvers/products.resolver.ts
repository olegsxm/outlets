import { Injectable } from '@angular/core';
import {ProductsModule} from '../products.module';
import {Store} from '@ngxs/store';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {IProduct} from '../../../shared/models/product.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: ProductsModule
})
export class ProductsResolver implements Resolve<IProduct[]> {

  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct[]> | Promise<IProduct[]> | IProduct[] {
    const category = parseInt(route.params.category, 10);
    return this.store.selectOnce(state => state.products)
      .pipe(map((data: {products: IProduct[]}) => {
        return (category === void 0 || isNaN(category))
        ? data.products
        : data.products.filter(product => product.categories.indexOf(category) !== -1);
      }));
  }
}
