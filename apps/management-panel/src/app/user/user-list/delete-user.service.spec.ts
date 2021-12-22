import {TestBed} from '@angular/core/testing';

import {DeleteUserService} from './delete-user.service';

describe('UserListService', () => {
  let service: DeleteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
