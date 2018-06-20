import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinempModaldeleteComponent } from './binemp-modaldelete.component';

describe('BinempModaldeleteComponent', () => {
  let component: BinempModaldeleteComponent;
  let fixture: ComponentFixture<BinempModaldeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinempModaldeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinempModaldeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
