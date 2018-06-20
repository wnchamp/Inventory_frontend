import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageStockComponent } from './garbage-stock.component';

describe('GarbageStockComponent', () => {
  let component: GarbageStockComponent;
  let fixture: ComponentFixture<GarbageStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
