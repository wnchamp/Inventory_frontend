import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowEmployeeComponent } from './borrow-employee.component';

describe('BorrowEmployeeComponent', () => {
  let component: BorrowEmployeeComponent;
  let fixture: ComponentFixture<BorrowEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
