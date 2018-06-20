import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldefectMultirepairComponent } from './modaldefect-multirepair.component';

describe('ModaldefectMultirepairComponent', () => {
  let component: ModaldefectMultirepairComponent;
  let fixture: ComponentFixture<ModaldefectMultirepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldefectMultirepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldefectMultirepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
