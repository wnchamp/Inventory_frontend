import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiReceiveDetailModalComponent } from './multi-receive-detail-modal.component';

describe('MultiReceiveDetailModalComponent', () => {
  let component: MultiReceiveDetailModalComponent;
  let fixture: ComponentFixture<MultiReceiveDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiReceiveDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiReceiveDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
