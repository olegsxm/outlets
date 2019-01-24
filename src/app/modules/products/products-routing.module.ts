import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductsResolver} from './resolvers/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    resolve: {
      products: ProductsResolver
    }
  },
  {
    path: ':category',
    component: ProductsListComponent,
    resolve: {
      products: ProductsResolver
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
