import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRepairDetailModalComponent } from './multi-repair-detail-modal.component';

describe('MultiRepairDetailModalComponent', () => {
  let component: MultiRepairDetailModalComponent;
  let fixture: ComponentFixture<MultiRepairDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiRepairDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRepairDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
