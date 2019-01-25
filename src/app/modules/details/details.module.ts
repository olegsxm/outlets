import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PipesModule} from '../../shared/pipes/pipes.module';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class DetailsModule { }
