import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowModalConfirmReturnComponent } from './borrow-modal-confirm-return.component';

describe('BorrowModalConfirmReturnComponent', () => {
  let component: BorrowModalConfirmReturnComponent;
  let fixture: ComponentFixture<BorrowModalConfirmReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowModalConfirmReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowModalConfirmReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
