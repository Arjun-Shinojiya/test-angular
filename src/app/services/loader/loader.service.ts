/**
 *          FILENAME: loader.service.ts
 *             ROUTE: totalscope_webclient/src/app/services/loader/
 *            AUTHOR: ICI/NK
 *              WHAT: DISPLAY LOADING SPINNERS OR TAKE ACTION BASED ON 
 *                    WHETHER THE APPLICATION IS CURRENTLY IN A LOADING STATE OR NOT.
 *               HOW: MANAGES LOADING STATE BY SETTING AND RETRIEVING THE LOADING STATE IN TOTALSCOPE.
 *   IMPORTING FILES: N/A
 * SUBSCRIBING FILES: loading.interceptor.ts
 *  LAST COMMIT DATE: AUGUST 22, 2023
 */

/**
 * INJECTABLE | CREATES SERVICES.
 */
import {Injectable} from '@angular/core';

/**
 * @INJECTABLE | MARKS A CLASS AS A SERVICE THAT CAN BE INJECTED INTO OTHER COMPONENTS.
 * PROVIDEDIN | SPECIFIES WHICH INJECTOR SHOULD PROVIDE THE SERVICE.
 * ROOT | INDICATES THAT THE SERVICE SHOULD BE PROVIDED IN THE ROOT INJECTOR. 
 */
@Injectable
({
  providedIn: 'root'
})

/**
 * DEFINES A CLASS LOADERSERVICE WITH SETLOADING() AND GETLOADING() METHODS. 
 * SETLOADING() SETS THE LOADING PROPERTY WITH A BOOLEAN ARGUMENT, AND GETLOADING() RETRIEVES ITS VALUE.
 */
export class LoaderService 
{
  private loading: boolean = false;
  constructor()
  {
  }
  setLoading (loading: boolean) 
  {
    this.loading = loading;
  }
  getLoading(): boolean 
  {
    return this.loading;
  }
}
