import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Control } from '../../control/model/control';

@Injectable({
  providedIn: 'root',
})
export class ScreenBoundriesService {
  private _maxBoundries$: BehaviorSubject<Control> =
    new BehaviorSubject<Control>({ up: 0, left: 0 });
  public maxBoundries$: Observable<Control> =
    this._maxBoundries$.asObservable();

  constructor() {}

  updateMaxBoundries(maxBoundries: Control): void {
    this._maxBoundries$.next(maxBoundries);
  }
}
