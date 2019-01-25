import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {DetailsResolverService} from './resolvers/details-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsComponent,
    resolve: {
      product: DetailsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
