import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteemployeeComponent } from './modal-deleteemployee.component';

describe('ModalDeleteemployeeComponent', () => {
  let component: ModalDeleteemployeeComponent;
  let fixture: ComponentFixture<ModalDeleteemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
