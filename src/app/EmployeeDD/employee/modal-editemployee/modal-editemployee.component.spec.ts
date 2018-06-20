import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditemployeeComponent } from './modal-editemployee.component';

describe('ModalEditemployeeComponent', () => {
  let component: ModalEditemployeeComponent;
  let fixture: ComponentFixture<ModalEditemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
