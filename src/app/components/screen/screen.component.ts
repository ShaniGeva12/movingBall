import { Component, ElementRef, ViewChild } from '@angular/core';
import { Control } from '../control/model/control';
import { ControlStatusService } from '../control/services/control-status.service';
import { Observable, Subscription } from 'rxjs';
import { ScreenBoundriesService } from './services/screen-boundries.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss'],
})
export class ScreenComponent {
  @ViewChild('screen') screenElm!: ElementRef;
  screenRect: DOMRect | undefined;
  @ViewChild('dot') dotElm!: ElementRef;
  dotRect: DOMRect | undefined;

  controlStatus$: Observable<Control> = this.controlStatusService.status$;
  statSub: Subscription | undefined;
  left = 0;
  top = 0;

  maxInsideScreen: Control = {
    up: 0,
    left: 0,
  };

  constructor(
    private controlStatusService: ControlStatusService,
    private screenBoundriesService: ScreenBoundriesService
  ) {}

  ngOnInit(): void {
    this.statSub = this.controlStatus$.subscribe((newStat) => {
      // multiply by 10 to better see changes on screen
      this.left = -newStat.left * 10;
      this.top = -newStat.up * 10;

      // console.log({ left: this.left, top: this.top });
    });
  }

  ngAfterViewInit() {
    this.screenRect = this.screenElm.nativeElement.getBoundingClientRect();
    this.dotRect = this.dotElm.nativeElement.getBoundingClientRect();
    this.setMaxPointsInsideScreen();
  }

  ngOnDestroy(): void {
    this.statSub?.unsubscribe();
  }

  setMaxPointsInsideScreen(): void {
    if (this.screenRect && this.dotRect) {
      this.maxInsideScreen.up =
        this.screenRect?.height / 2 - this.dotRect?.height / 2;
      this.maxInsideScreen.left =
        this.screenRect?.width / 2 - this.dotRect?.width / 2;
    }
    this.screenBoundriesService.updateMaxBoundries(this.maxInsideScreen);
  }
}
