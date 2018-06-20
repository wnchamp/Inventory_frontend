import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBorrowStockComponent } from './modal-borrow-stock.component';

describe('ModalBorrowStockComponent', () => {
  let component: ModalBorrowStockComponent;
  let fixture: ComponentFixture<ModalBorrowStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBorrowStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBorrowStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
