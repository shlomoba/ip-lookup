import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IpSearchResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class IpSearchService {
  ipv4regex =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  ipv6regex =
    /(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){1,7}:|(?:[A-Fa-f0-9]{1,4}:){1,6}:[A-Fa-f0-9]{1,4}|(?:[A-Fa-f0-9]{1,4}:){1,5}(?::[A-Fa-f0-9]{1,4}){1,2}|(?:[A-Fa-f0-9]{1,4}:){1,4}(?::[A-Fa-f0-9]{1,4}){1,3}|(?:[A-Fa-f0-9]{1,4}:){1,3}(?::[A-Fa-f0-9]{1,4}){1,4}|(?:[A-Fa-f0-9]{1,4}:){1,2}(?::[A-Fa-f0-9]{1,4}){1,5}|[A-Fa-f0-9]{1,4}:(?:(?::[A-Fa-f0-9]{1,4}){1,6})|:(?:(?::[A-Fa-f0-9]{1,4}){1,7}|:)|fe80:(?::[A-Fa-f0-9]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(?::0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|(?:[A-Fa-f0-9]{1,4}:){1,4}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])/;
  cache = new Map<string, IpSearchResponse>();

  constructor(private http: HttpClient) {}

  check(ip: string): boolean {
    if (this.ipv4regex.test(ip) || this.ipv6regex.test(ip)) {
      return true;
    }

    return false;
  }

  search(ip: string): Observable<IpSearchResponse> {
    if (this.cache.has(ip)) {
      return new Observable((observer) => {
        observer.next(this.cache.get(ip));
        observer.complete();
      });
    }

    return this.http.get<IpSearchResponse>(`https://api.country.is/${ip}`).pipe(
      tap((response) => {
        this.cache.set(ip, response);
      })
    );
  }
}
