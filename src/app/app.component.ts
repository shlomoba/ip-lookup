import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { IpSearch } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  searches: IpSearch[] = [];

  onAdd() {
    this.searches.push({
      id: uuidv4(),
      ip: null,
      country: null,
      time: null,
    });
  }
}
