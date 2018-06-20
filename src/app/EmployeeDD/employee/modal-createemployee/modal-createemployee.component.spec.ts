import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateemployeeComponent } from './modal-createemployee.component';

describe('ModalCreateemployeeComponent', () => {
  let component: ModalCreateemployeeComponent;
  let fixture: ComponentFixture<ModalCreateemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
