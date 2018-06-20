import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStockDetailComponent } from './modal-stock-detail.component';

describe('ModalStockDetailComponent', () => {
  let component: ModalStockDetailComponent;
  let fixture: ComponentFixture<ModalStockDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalStockDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
