import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalrepairMultireceiveComponent } from './modalrepair-multireceive.component';

describe('ModalrepairMultireceiveComponent', () => {
  let component: ModalrepairMultireceiveComponent;
  let fixture: ComponentFixture<ModalrepairMultireceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalrepairMultireceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalrepairMultireceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
