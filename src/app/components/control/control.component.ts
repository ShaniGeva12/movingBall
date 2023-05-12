import { Component } from '@angular/core';
import { ControlStatusService } from './services/control-status.service';
import { ControllerButton } from './model/controller-button';
import { Control } from './model/control';
import { Observable, Subscription } from 'rxjs';
import { ScreenBoundriesService } from '../screen/services/screen-boundries.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
})
export class ControlComponent {
  controllerButton = ControllerButton;
  control: Control = {
    up: 0,
    left: 0,
  };

  maxBoundriesSub: Subscription | undefined;
  maxBoundries$: Observable<Control> =
    this.screenBoundriesService.maxBoundries$;
  maxBoundries: Control = { up: 0, left: 0 };
  // isOutsideBoundries = false;

  constructor(
    private controlStatusService: ControlStatusService,
    private screenBoundriesService: ScreenBoundriesService
  ) {}

  ngOnInit(): void {
    this.maxBoundriesSub = this.maxBoundries$.subscribe(
      (val) => (this.maxBoundries = val)
    );
  }

  onButtonClicked(btn: ControllerButton): void {
    switch (btn) {
      case 'up':
        if ((this.control.up + 1) * 10 <= this.maxBoundries.up)
          this.control.up++;
        break;
      case 'down':
        if (Math.abs(this.control.up - 1) * 10 <= this.maxBoundries.up)
          this.control.up--;
        break;
      case 'left':
        if ((this.control.left + 1) * 10 <= this.maxBoundries.left)
          this.control.left++;
        break;
      case 'right':
        if (Math.abs(this.control.left - 1) * 10 <= this.maxBoundries.left)
          this.control.left--;
        break;
      case 'reset':
        this.control.left = 0;
        this.control.up = 0;
        break;
      default:
        break;
    }

    this.controlStatusService.updateControlStatus(this.control);
  }

  // TODO: make this a directive to function on a higher level
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.onButtonClicked(this.controllerButton.up);
        break;
      case 'ArrowDown':
        this.onButtonClicked(this.controllerButton.down);
        break;
      case 'ArrowLeft':
        this.onButtonClicked(this.controllerButton.left);
        break;
      case 'ArrowRight':
        this.onButtonClicked(this.controllerButton.right);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.maxBoundriesSub?.unsubscribe();
  }
}
