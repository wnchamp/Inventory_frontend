import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalrepairEditComponent } from './modalrepair-edit.component';

describe('ModalrepairEditComponent', () => {
  let component: ModalrepairEditComponent;
  let fixture: ComponentFixture<ModalrepairEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalrepairEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalrepairEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
