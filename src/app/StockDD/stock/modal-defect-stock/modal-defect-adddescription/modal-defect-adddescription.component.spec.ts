import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDefectAdddescriptionComponent } from './modal-defect-adddescription.component';

describe('ModalDefectAdddescriptionComponent', () => {
  let component: ModalDefectAdddescriptionComponent;
  let fixture: ComponentFixture<ModalDefectAdddescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDefectAdddescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDefectAdddescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
