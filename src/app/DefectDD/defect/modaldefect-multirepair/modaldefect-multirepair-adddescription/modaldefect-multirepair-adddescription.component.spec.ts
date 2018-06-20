import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldefectMultirepairAdddescriptionComponent } from './modaldefect-multirepair-adddescription.component';

describe('ModaldefectMultirepairAdddescriptionComponent', () => {
  let component: ModaldefectMultirepairAdddescriptionComponent;
  let fixture: ComponentFixture<ModaldefectMultirepairAdddescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldefectMultirepairAdddescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldefectMultirepairAdddescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
