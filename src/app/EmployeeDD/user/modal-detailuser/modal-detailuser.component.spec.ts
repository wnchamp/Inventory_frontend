import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailuserComponent } from './modal-detailuser.component';

describe('ModalDetailuserComponent', () => {
  let component: ModalDetailuserComponent;
  let fixture: ComponentFixture<ModalDetailuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
