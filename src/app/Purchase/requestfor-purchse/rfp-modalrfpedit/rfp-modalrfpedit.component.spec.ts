import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfpModalrfpeditComponent } from './rfp-modalrfpedit.component';

describe('RfpModalrfpeditComponent', () => {
  let component: RfpModalrfpeditComponent;
  let fixture: ComponentFixture<RfpModalrfpeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfpModalrfpeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfpModalrfpeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
