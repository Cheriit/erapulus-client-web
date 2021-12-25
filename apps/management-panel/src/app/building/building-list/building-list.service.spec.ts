import {TestBed} from '@angular/core/testing';

import {BuildingListService} from './building-list.service';

describe('UserListService', () => {
  let service: BuildingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
