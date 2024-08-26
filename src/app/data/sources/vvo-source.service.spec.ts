import { TestBed } from '@angular/core/testing';

import { VvoSourceService } from './vvo-source.service';

describe('VvoSourceService', () => {
  let service: VvoSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VvoSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
