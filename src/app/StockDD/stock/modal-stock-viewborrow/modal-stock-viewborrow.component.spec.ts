import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStockViewborrowComponent } from './modal-stock-viewborrow.component';

describe('ModalStockViewborrowComponent', () => {
  let component: ModalStockViewborrowComponent;
  let fixture: ComponentFixture<ModalStockViewborrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalStockViewborrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStockViewborrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
