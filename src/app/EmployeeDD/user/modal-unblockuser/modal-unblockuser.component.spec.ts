import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnblockuserComponent } from './modal-unblockuser.component';

describe('ModalUnblockuserComponent', () => {
  let component: ModalUnblockuserComponent;
  let fixture: ComponentFixture<ModalUnblockuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUnblockuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUnblockuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
