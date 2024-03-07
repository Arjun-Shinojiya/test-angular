import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


/**
 * Base Service
 *
 */
@Injectable()
export class BaseService
{

    /**
     * Constructor
     *
     * @method constructor
     * @param http HttpClient
    */
    constructor (protected http: HttpClient)
    {

    }


    /**
     * Send http get request to server.
     *
     * @method __get
     * @param url string
    */
    protected _get (url: string): Observable<any>
    {
        return this.http.get(`${environment.apiURL}/${url}`);
    }

    /**
     * Send http get request to server.
     *
     * @method _geturl
     * @param url string
    */
    protected _geturl (url: string): Observable<any>
    {
        return this.http.get(`${url}`);
    }

	/**
     * Send http post request to server
     *
     * @method __post
     * @param url string
     * @param postBody object
    */
    protected _post (url: string, postBody: object): Observable<any>
    {
        return this.http.post(`${environment.apiURL}/${url}`, postBody);
    }

    /**
     * Send http put request to server.
     *
     * @method __put
     * @param url string
     * @param putBody object
    */
    protected _put (url: string, putBody: object): Observable<any>
    {
        return this.http.put(`${environment.apiURL}/${url}`, putBody);
    }

    /**
     * Send http put request to server.
     *
     * @method _puturl
     * @param url string
     * @param putBody object
    */
    protected _puturl (url: string, putBody: object): Observable<any>
    {
        return this.http.put(`${url}`, putBody, { observe: 'response' });
    }

    /**
     * Send http delete request to server
     *
     * @method __delete
     * @param url string
     */
    protected _delete (url: string, body: object): Observable<any>
    {
        return this.http.delete(`${environment.apiURL}/${url}`, {
            body: body
        },);
    }
}
