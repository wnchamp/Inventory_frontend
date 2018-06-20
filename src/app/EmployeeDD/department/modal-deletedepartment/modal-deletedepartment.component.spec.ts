import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletedepartmentComponent } from './modal-deletedepartment.component';

describe('ModalDeletedepartmentComponent', () => {
  let component: ModalDeletedepartmentComponent;
  let fixture: ComponentFixture<ModalDeletedepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeletedepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeletedepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
