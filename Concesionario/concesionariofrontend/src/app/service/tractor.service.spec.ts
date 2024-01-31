import { TestBed } from '@angular/core/testing';

import { TractorService } from './tractor.service';

describe('TractorService', () => {
  let service: TractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TractorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
