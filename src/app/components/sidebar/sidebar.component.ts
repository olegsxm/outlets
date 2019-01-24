import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {ICategory} from '../../shared/models/category.model';
import {Router} from '@angular/router';
import {TreeNode} from 'angular-tree-component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  @Input() categories: ICategory[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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
