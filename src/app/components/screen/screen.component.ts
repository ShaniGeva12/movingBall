import { Component } from '@angular/core';
import { Control } from '../control/model/control';
import { ControlStatusService } from '../control/services/control-status.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss'],
})
export class ScreenComponent {
  controlStatus$: Observable<Control> = this.controlStatusService.status$;
  statSub: Subscription | undefined;
  left = 0;
  top = 0;

  constructor(private controlStatusService: ControlStatusService) {}

  ngOnInit(): void {
    this.statSub = this.controlStatus$.subscribe((newStat) => {
      // multiply by 10 to better see changes on screen
      this.left = -newStat.left * 10;
      this.top = -newStat.up * 10;
    });
  }

  ngOnDestroy(): void {
    this.statSub?.unsubscribe();
  }
}
