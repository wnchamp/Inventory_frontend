import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDefectModaldefectComponent } from './modal-defect-modaldefect.component';

describe('ModalDefectModaldefectComponent', () => {
  let component: ModalDefectModaldefectComponent;
  let fixture: ComponentFixture<ModalDefectModaldefectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDefectModaldefectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDefectModaldefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
