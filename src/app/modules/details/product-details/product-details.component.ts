import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {UpdateProduct} from '../../../state/actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriber$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      categories: [],
      image: [null, [Validators.required]],
      price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      quantity: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.subscriber$ = this.route.data
      .pipe( map( (data: Data) => data.product))
      .subscribe(product => this.form.patchValue(product));
  }

  convertFile(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    this.form.get('image').patchValue(url);
  }

  save() {
    if (this.form.valid) {
      this.store.dispatch(new UpdateProduct(this.form.value));
    }
  }

  ngOnDestroy(): void {
    this.subscriber$.unsubscribe();
  }
}
