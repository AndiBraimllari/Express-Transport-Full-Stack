import {TestBed} from '@angular/core/testing';

import {StatusMappingService} from './status-mapping.service';

describe('StatusMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusMappingService = TestBed.get(StatusMappingService);
    expect(service).toBeTruthy();
  });
});
