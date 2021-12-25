import {TestBed} from '@angular/core/testing';

import {UniversityTableService} from './university-table.service';

describe('UserListService', () => {
  let service: UniversityTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
