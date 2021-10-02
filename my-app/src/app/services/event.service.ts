import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private dbSourceChangedSource = new Subject<string>();

  dbSourceChanged$ = this.dbSourceChangedSource.asObservable();

  onDbSourceChange(source: string) {
    this.dbSourceChangedSource.next(source);
  }

  constructor() {}
}
