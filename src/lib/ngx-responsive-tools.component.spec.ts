import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxResponsiveToolsComponent } from './ngx-responsive-tools.component';

describe('NgxResponsiveToolsComponent', () => {
  let component: NgxResponsiveToolsComponent;
  let fixture: ComponentFixture<NgxResponsiveToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxResponsiveToolsComponent]
    });
    fixture = TestBed.createComponent(NgxResponsiveToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
