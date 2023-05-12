import { Component } from '@angular/core';
import { ControlStatusService } from './services/control-status.service';
import { ControllerButton } from './model/controller-button';
import { Control } from './model/control';

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

  constructor(private controlStatusService: ControlStatusService) {}

  onButtonClicked(btn: ControllerButton): void {
    switch (btn) {
      case 'up':
        this.control.up++;
        break;
      case 'down':
        this.control.up--;
        break;
      case 'left':
        this.control.left++;
        break;
      case 'right':
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
}
