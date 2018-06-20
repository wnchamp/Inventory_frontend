import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditdepartmentComponent } from './modal-editdepartment.component';

describe('ModalEditdepartmentComponent', () => {
  let component: ModalEditdepartmentComponent;
  let fixture: ComponentFixture<ModalEditdepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditdepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
