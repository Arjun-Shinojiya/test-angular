/**
 *          FILENAME: token.service.ts
 *             ROUTE: totalscope_webclient/src/app/services/token/
 *            AUTHOR: ICI/SB
 *              WHAT: MANAGES TOKEN FOR USER AUTHENTICATION.
 *               HOW: DEFINES TOKENSERVICE CLASS FOR TOKEN MANAGEMENT IN LOCAL STORAGE.
 *   IMPORTING FILES: N/A
 * SUBSCRIBING FILES: login.component.ts | login-success.component.ts
 *  LAST COMMIT DATE: AUGUST 19, 2023
 */

/**
 * INJECTABLE | CREATES SERVICES.
 */
import {Injectable} from '@angular/core';

/**
 * BEHAVIORSUBJECT | ALLOWS VALUES TO BE MULTICASTED TO MULTIPLE OBSERVERS.
 * OBSERVABLE | CREATES AND SUBSCRIBES TO STREAMS OF DATA.
 */
import {BehaviorSubject, Observable} from 'rxjs';

/**
 * @INJECTABLE | MARKS A CLASS AS A SERVICE THAT CAN BE INJECTED INTO OTHER COMPONENTS.
 * PROVIDEDIN | SPECIFIES WHICH INJECTOR SHOULD PROVIDE THE SERVICE.
 * ROOT | INDICATES THAT THE SERVICE SHOULD BE PROVIDED IN THE ROOT INJECTOR. 
 */
@Injectable
({
  providedIn: 'root',
})

/**
 * DEFINES A TOKENSERVICE CLASS FOR MANAGING A TOKEN IN LOCAL STORAGE. IT INCLUDES THE PROPERTIES TOKENKEY AND TOKENSUBJECT, 
 * A CONSTRUCTOR ATTACHING A LOCAL STORAGE CHANGE LISTENER, METHODS HASTOKEN, SETTOKEN, REMOVETOKEN, AND GETTOKENSTATUS FOR TOKEN MANAGEMENT.
 */
export class TokenService 
{

  // STORES THE TOKEN KEY FOR USER LOGIN.
  private tokenKey = 'loginToken';

  // CREATES A SUBJECT TO TRACK THE LOGIN STATUS.
  private tokenSubject = new BehaviorSubject <boolean> (this.hasToken());

  constructor() 
  {

    // LISTENS FOR CHANGES IN LOCAL STORAGE RELATED TO THE LOGIN TOKEN.
    window.addEventListener ('storage', (event) => 
    {

      // IF THE LOGIN TOKEN CHANGES IN STORAGE, IT UPDATES THE LOGIN STATUS.
      if (event.key === this.tokenKey) 
      {
        this.tokenSubject.next (this.hasToken());
      }
    });
  }

  // CHECKS IF A TOKEN IS PRESENT IN LOCAL STORAGE.
  private hasToken(): boolean 
  {
    return localStorage.getItem (this.tokenKey) !== null;
  }

  // STORES A TOKEN IN LOCAL STORAGE.
  setToken (token: string): void 
  {
    localStorage.setItem (this.tokenKey, token);
    this.tokenSubject.next (true); // NOTIFY OBSERVERS THAT A TOKEN HAS BEEN SET.
  }

  // GET TOKEN FROM LOCAL STORAGE.
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // REMOVES A TOKEN FROM THE LOCAL STORAGE.
  removeToken(): void 
  {
    localStorage.removeItem (this.tokenKey);
    this.tokenSubject.next (false); // NOTIFY OBSERVERS THAT A TOKEN IS REMOVED.
  }

  // OBSERVES CHANGES IN TOKEN STATUS.
  getTokenStatus(): Observable <boolean> 
  {
    return this.tokenSubject.asObservable();
  }
}
