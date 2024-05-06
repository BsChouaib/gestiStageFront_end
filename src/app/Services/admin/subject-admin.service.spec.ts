import { TestBed } from '@angular/core/testing';

import { SubjectAdminService } from './subject-admin.service';

describe('SubjectAdminService', () => {
  let service: SubjectAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
