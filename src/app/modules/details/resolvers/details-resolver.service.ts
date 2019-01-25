import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {IProduct} from '../../../shared/models/product.model';
import {Observable} from 'rxjs';
import {DetailsModule} from '../details.module';
import {Store} from '@ngxs/store';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: DetailsModule
})
export class DetailsResolverService implements Resolve<IProduct> {
  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> | Promise<IProduct> | IProduct {
    const id = parseInt(route.params.id, 10);

    return this.store.selectOnce(state => state.products)
      .pipe(
        map((data: {products: IProduct[]}) => {
          return (id === void 0 || isNaN(id))
          ? null
          : data.products.find(product => product.id === id);
        })
      );
  }
}
