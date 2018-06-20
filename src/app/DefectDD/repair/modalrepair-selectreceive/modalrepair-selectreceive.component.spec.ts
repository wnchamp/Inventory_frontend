import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalrepairSelectreceiveComponent } from './modalrepair-selectreceive.component';

describe('ModalrepairSelectreceiveComponent', () => {
  let component: ModalrepairSelectreceiveComponent;
  let fixture: ComponentFixture<ModalrepairSelectreceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalrepairSelectreceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalrepairSelectreceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
