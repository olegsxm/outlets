import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DataService} from './shared/services/data.service';
import {Store} from '@ngxs/store';
import {AddProducts} from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private dataService: DataService,
    private store: Store
  ) {
    this.init();
  }

  init() {
    this.dataService.products.toPromise()
      .then(products => this.store.dispatch(new AddProducts(products)));
  }
}
