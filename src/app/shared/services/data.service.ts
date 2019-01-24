import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct} from '../models/product.model';
import {ICategory} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  get products(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/assets/data/products.json');
  }

  get categories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/assets/data/categories.json');
  }
}
