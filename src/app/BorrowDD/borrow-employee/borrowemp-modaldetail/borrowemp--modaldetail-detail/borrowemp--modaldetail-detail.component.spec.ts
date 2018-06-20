import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowempModaldetailDetailComponent } from './borrowemp--modaldetail-detail.component';

describe('BorrowempModaldetailDetailComponent', () => {
  let component: BorrowempModaldetailDetailComponent;
  let fixture: ComponentFixture<BorrowempModaldetailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowempModaldetailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowempModaldetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
