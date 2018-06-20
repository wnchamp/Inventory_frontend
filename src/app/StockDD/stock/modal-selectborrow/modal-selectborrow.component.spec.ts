import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectborrowComponent } from './modal-selectborrow.component';

describe('ModalSelectborrowComponent', () => {
  let component: ModalSelectborrowComponent;
  let fixture: ComponentFixture<ModalSelectborrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectborrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectborrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
