import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpModalrfpdeatailsComponent } from './rfp-modalrfpdeatails.component';

describe('RfpModalrfpdeatailsComponent', () => {
  let component: RfpModalrfpdeatailsComponent;
  let fixture: ComponentFixture<RfpModalrfpdeatailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpModalrfpdeatailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpModalrfpdeatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
