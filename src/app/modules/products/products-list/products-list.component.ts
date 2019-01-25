import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Store} from '@ngxs/store';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {IProduct} from '../../../shared/models/product.model';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {CreateProduct, DeleteProducts} from '../../../state/actions';

@AutoUnsubscribe()
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: IProduct[];
  category: number;
  storeProducts$;
  resolveProducts$;
  selected: number[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.category = parseInt(params.category, 10));

    this.storeProducts$ = this.store.select(state => {
      this.products =
        state.products.products.filter(product => product.categories.indexOf(this.category) !== -1);
      this.cd.markForCheck();
    }).subscribe(data => {});

    this.resolveProducts$ = this.route.data.pipe(
      map((data: {products: IProduct[]}) => data.products)
    ).subscribe(products => {
      this.products = products;
      this.cd.markForCheck();
    });
  }


  addProduct() {
    this.store.dispatch(new CreateProduct());
  }

  ngOnDestroy(): void {
  }

  toggleSelected(product: IProduct) {
    const index = this.selected.indexOf(product.id);
    if (index > -1) {
      this.selected = this.selected.filter(i => i !== product.id);
    } else {
      this.selected = [...this.selected, product.id];
    }
  }

  remove() {
    this.store.dispatch(new DeleteProducts(this.selected));
    this.selected = [];
  }
}
