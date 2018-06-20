import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectdefectComponent } from './modal-selectdefect.component';

describe('ModalSelectdefectComponent', () => {
  let component: ModalSelectdefectComponent;
  let fixture: ComponentFixture<ModalSelectdefectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectdefectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectdefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
