import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowempModaldetailComponent } from './borrowemp-modaldetail.component';

describe('BorrowempModaldetailComponent', () => {
  let component: BorrowempModaldetailComponent;
  let fixture: ComponentFixture<BorrowempModaldetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowempModaldetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowempModaldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
