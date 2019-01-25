import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {ICategory} from '../../shared/models/category.model';
import {Router} from '@angular/router';
import {TreeNode} from 'angular-tree-component';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories: ICategory[];
  hideSideBar = false;

  constructor(
    private router: Router,
    private data: DataService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.data.categories.toPromise()
      .then(categories => this.categories = categories)
      .then(() => this.cd.markForCheck());
  }

  navigate(event: TreeNode) {
    const parents = [event.data];
    let parent = event.realParent;

    while (parent) {
      parents.push(parent.data);
      parent = parent.realParent;
    }

    // this.router.navigate(['', (event.data as ICategory).category]);
    this.router.navigateByUrl(`/${ (event.data as ICategory).category }`);
  }

}
