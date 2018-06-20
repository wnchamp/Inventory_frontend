import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangepassComponent } from './modal-changepass.component';

describe('ModalChangepassComponent', () => {
  let component: ModalChangepassComponent;
  let fixture: ComponentFixture<ModalChangepassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangepassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
