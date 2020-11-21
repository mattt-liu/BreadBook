import { TestBed } from '@angular/core/testing';

import { DashboardDisplayService } from './dashboard-display.service';

describe('DashboardDisplayService', () => {
  let service: DashboardDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
