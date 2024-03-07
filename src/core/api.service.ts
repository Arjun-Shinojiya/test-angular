import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {

  private apiURL:string = environment.apiURL;
  
  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.http.get(this.apiURL + url);
  }

  public post(url: string, data: any): Observable<any> {
    return this.http.post(this.apiURL + url, data);
  }

  public put(url: string, data: any): Observable<any> {
    return this.http.put(this.apiURL + url, data);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(this.apiURL + url);
  }
}

