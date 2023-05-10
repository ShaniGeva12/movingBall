import { TestBed } from '@angular/core/testing';

import { ControlStatusService } from './control-status.service';

describe('ControlStatusService', () => {
  let service: ControlStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
