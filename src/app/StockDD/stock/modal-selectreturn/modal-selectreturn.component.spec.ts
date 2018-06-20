import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectreturnComponent } from './modal-selectreturn.component';

describe('ModalSelectreturnComponent', () => {
  let component: ModalSelectreturnComponent;
  let fixture: ComponentFixture<ModalSelectreturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectreturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
