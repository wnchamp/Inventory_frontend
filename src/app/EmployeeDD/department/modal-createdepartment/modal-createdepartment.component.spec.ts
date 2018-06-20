import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatedepartmentComponent } from './modal-createdepartment.component';

describe('ModalCreatedepartmentComponent', () => {
  let component: ModalCreatedepartmentComponent;
  let fixture: ComponentFixture<ModalCreatedepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreatedepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreatedepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
