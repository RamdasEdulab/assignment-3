import { TestBed } from '@angular/core/testing';

import { UploadService } from './file-upload.service';

describe('FileUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadService = TestBed.get(UploadService);
    expect(service).toBeTruthy();
  });
});
