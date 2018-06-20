import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEdituserComponent } from './modal-edituser.component';

describe('ModalEdituserComponent', () => {
  let component: ModalEdituserComponent;
  let fixture: ComponentFixture<ModalEdituserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEdituserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEdituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
