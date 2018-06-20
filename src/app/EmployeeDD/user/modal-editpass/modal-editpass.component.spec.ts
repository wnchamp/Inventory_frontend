import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditpassComponent } from './modal-editpass.component';

describe('ModalEditpassComponent', () => {
  let component: ModalEditpassComponent;
  let fixture: ComponentFixture<ModalEditpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
