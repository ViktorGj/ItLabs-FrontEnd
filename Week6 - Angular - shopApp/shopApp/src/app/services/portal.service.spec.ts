import { TestBed } from '@angular/core/testing';

import { PortalService } from './portal.service';

describe('PortalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortalService = TestBed.get(PortalService);
    expect(service).toBeTruthy();
  });
});
