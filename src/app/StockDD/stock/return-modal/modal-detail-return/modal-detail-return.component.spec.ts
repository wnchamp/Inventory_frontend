import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailReturnComponent } from './modal-detail-return.component';

describe('ModalDetailReturnComponent', () => {
  let component: ModalDetailReturnComponent;
  let fixture: ComponentFixture<ModalDetailReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
