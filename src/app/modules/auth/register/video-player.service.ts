// Importing necessary modules from Angular and RxJS
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Injectable decorator allows this service to be injected into other components or services
@Injectable({
  providedIn: 'root' // providedIn: 'root' ensures that Angular provides the service at the root level
})
export class VideoPlayerService {
  // Constructor initializes the service
  constructor() { }

  // BehaviorSubject to manage the state of autoplay, initial value is set to false
  private autoplaySubject = new BehaviorSubject<boolean>(false);

  // Observable to which components can subscribe to get updates on the autoplay state
  autoplay$ = this.autoplaySubject.asObservable();

  // Method to update the autoplay state by emitting a new value to the BehaviorSubject
  setAutoplay(autoplay: boolean) {
    this.autoplaySubject.next(autoplay);
  }
}
