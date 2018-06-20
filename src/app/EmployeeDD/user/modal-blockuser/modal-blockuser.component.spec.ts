import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBlockuserComponent } from './modal-blockuser.component';

describe('ModalBlockuserComponent', () => {
  let component: ModalBlockuserComponent;
  let fixture: ComponentFixture<ModalBlockuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBlockuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBlockuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
