import { TestBed } from '@angular/core/testing';

import { ScreenBoundriesService } from './screen-boundries.service';

describe('ScreenBoundriesService', () => {
  let service: ScreenBoundriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenBoundriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
