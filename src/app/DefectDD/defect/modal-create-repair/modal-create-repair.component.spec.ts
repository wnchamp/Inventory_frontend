import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateRepairComponent } from './modal-create-repair.component';

describe('ModalCreateRepairComponent', () => {
  let component: ModalCreateRepairComponent;
  let fixture: ComponentFixture<ModalCreateRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
