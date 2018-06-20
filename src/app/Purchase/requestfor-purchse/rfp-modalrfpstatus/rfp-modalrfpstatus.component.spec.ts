import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpModalrfpstatusComponent } from './rfp-modalrfpstatus.component';

describe('RfpModalrfpstatusComponent', () => {
  let component: RfpModalrfpstatusComponent;
  let fixture: ComponentFixture<RfpModalrfpstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpModalrfpstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpModalrfpstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
