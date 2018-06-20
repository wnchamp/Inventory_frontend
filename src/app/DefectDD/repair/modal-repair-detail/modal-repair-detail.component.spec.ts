import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRepairDetailComponent } from './modal-repair-detail.component';

describe('ModalRepairDetailComponent', () => {
  let component: ModalRepairDetailComponent;
  let fixture: ComponentFixture<ModalRepairDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRepairDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRepairDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
