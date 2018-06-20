import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDefectStockComponent } from './modal-defect-stock.component';

describe('ModalDefectStockComponent', () => {
  let component: ModalDefectStockComponent;
  let fixture: ComponentFixture<ModalDefectStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDefectStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDefectStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
