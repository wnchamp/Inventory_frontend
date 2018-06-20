import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBorrowDetailComponent } from './modal-borrow-detail.component';

describe('ModalBorrowDetailComponent', () => {
  let component: ModalBorrowDetailComponent;
  let fixture: ComponentFixture<ModalBorrowDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBorrowDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBorrowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
