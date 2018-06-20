import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailemployeeComponent } from './modal-detailemployee.component';

describe('ModalDetailemployeeComponent', () => {
  let component: ModalDetailemployeeComponent;
  let fixture: ComponentFixture<ModalDetailemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
