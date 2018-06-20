import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailReceiveComponent } from './modal-detail-receive.component';

describe('ModalDetailReceiveComponent', () => {
  let component: ModalDetailReceiveComponent;
  let fixture: ComponentFixture<ModalDetailReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
