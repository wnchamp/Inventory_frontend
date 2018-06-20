import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowempModalreturnComponent } from './borrowemp-modalreturn.component';

describe('BorrowempModalreturnComponent', () => {
  let component: BorrowempModalreturnComponent;
  let fixture: ComponentFixture<BorrowempModalreturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowempModalreturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowempModalreturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
