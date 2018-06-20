import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDelStockComponent } from './modal-del-stock.component';

describe('ModalDelStockComponent', () => {
  let component: ModalDelStockComponent;
  let fixture: ComponentFixture<ModalDelStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDelStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDelStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
