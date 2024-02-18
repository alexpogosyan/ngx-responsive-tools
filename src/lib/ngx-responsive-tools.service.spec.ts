import { TestBed } from '@angular/core/testing';

import { NgxResponsiveToolsService } from './ngx-responsive-tools.service';

describe('NgxResponsiveToolsService', () => {
  let service: NgxResponsiveToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxResponsiveToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
