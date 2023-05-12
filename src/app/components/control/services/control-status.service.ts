import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Control } from '../model/control';

@Injectable({
  providedIn: 'root',
})
export class ControlStatusService {
  private _status$: BehaviorSubject<Control> = new BehaviorSubject<Control>({
    up: 0,
    left: 0,
  });
  public status$: Observable<Control> = this._status$.asObservable();

  constructor() {}

  updateControlStatus(newStatus: Control): void {
    this._status$.next(newStatus);
  }
}
