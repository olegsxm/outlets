import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngxs/store';
import {ActivatedRoute, Data} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IProduct} from '../../../shared/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit {
  products$: Observable<IProduct[]> = this.route.data
    .pipe(map( (data: Data) => data.products));

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
}
