import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldefectShowdetailComponent } from './modaldefect-showdetail.component';

describe('ModaldefectShowdetailComponent', () => {
  let component: ModaldefectShowdetailComponent;
  let fixture: ComponentFixture<ModaldefectShowdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldefectShowdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldefectShowdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
