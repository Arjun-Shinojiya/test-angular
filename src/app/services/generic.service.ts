
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable, Subject} from 'rxjs';

// RESPONSIBLE TO SERVE ALMOST EVERY SERVICE IN ENTIRE PROJECT.
@Injectable()
export class GenericService extends BaseService
{

    constructor(
        protected _http: HttpClient,
    )
    {
        super(_http);
    }

    /**
     * SEND GET REQUEST TO SERVER.
     *
     * @method get
     * @param url string
    */
    public get(url:string): Observable<any> {
        return this._get(url);
    }

    /**
     * SEND GET REQUEST TO SERVER.
     *
     * @method geturl
     * @param url string
    */
    public geturl(url:string): Observable<any> {
        return this._geturl(url);
    }

    /**
     * SEND POST REQUEST TO SERVER.
     *
     * @method post
     * @param url string
     * @param postBody object
    */
    public post(url:string, postBody:object): Observable<any> {
        return this._post(url, postBody);
    }

    /**
     * SEND PUT REQUEST TO SERVER.
     *
     * @method put
     * @param url string
     * @param putBody object
    */
    public put(url:string, putBody:object): Observable<any> {
        return this._put(url, putBody);
    }

    /**
     * SEND PUT REQUEST TO SERVER.
     *
     * @method puturl
     * @param url string
     * @param putBody object
    */
    public puturl(url:string, putBody:object): Observable<any> {
        return this._puturl(url, putBody);
    }

    /**
     * SEND DELETE REQUEST TO SERVER.
     *
     * @method delete
     * @param url string
     */
    public delete(url:string, body: object): Observable<any> {
        return this._delete(url, body);
    }
	
}
