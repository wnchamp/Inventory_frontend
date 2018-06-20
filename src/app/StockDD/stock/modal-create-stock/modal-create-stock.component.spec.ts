import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateStockComponent } from './modal-create-stock.component';

describe('ModalCreateStockComponent', () => {
  let component: ModalCreateStockComponent;
  let fixture: ComponentFixture<ModalCreateStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
