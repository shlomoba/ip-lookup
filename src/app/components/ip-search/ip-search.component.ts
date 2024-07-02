import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of, from, fromEvent, catchError, throwError } from 'rxjs';
import { IpSearchService } from '../../ip-search.service';
import { IpSearch, IpSearchResponse } from '../../types';
import { get } from 'lodash';

@Component({
  selector: 'app-ip-search',
  templateUrl: './ip-search.component.html',
  styleUrl: './ip-search.component.scss',
})
export class IpSearchComponent implements OnInit, OnDestroy {
  @Input() item!: IpSearch;
  searchText: string = '';
  subscription: any;
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  @ViewChild('search', { static: true }) search!: ElementRef;

  constructor(private elm: ElementRef, private service: IpSearchService) {}

  ngOnInit() {
    this.subscription = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        map(() => this.searchText.trim()),
        filter((trimmedText) => trimmedText.length > 0),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.loading = true;
          this.error = false;
        }),
        switchMap((trimmedText) =>
          this.service.check(trimmedText)
            ? this.service.search(trimmedText).pipe(
                catchError((error) => {
                  this.handleError(error);
                  return of(null);
                })
              )
            : throwError(new Error('Invalid IP address')).pipe(
                catchError((error) => {
                  this.handleError(error);
                  return of(null);
                })
              )
        )
      )
      .subscribe({
        next: (result) => {
          if (result) {
            this.item.country = result.country.toLowerCase();
            this.item.time = new Date().toLocaleTimeString();
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Unhandled error:', error);
        },
        complete: () => console.log('Completed'),
      });
  }

  handleError(e: any): void {
    const error = get(e, 'error.error', e);
    this.loading = false;
    this.error = true;
    this.errorMessage = error.message;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
