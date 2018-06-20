import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpModalrfpcreateComponent } from './rfp-modalrfpcreate.component';

describe('RfpModalrfpcreateComponent', () => {
  let component: RfpModalrfpcreateComponent;
  let fixture: ComponentFixture<RfpModalrfpcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpModalrfpcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpModalrfpcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
