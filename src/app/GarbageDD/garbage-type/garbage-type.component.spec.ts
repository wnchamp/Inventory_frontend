import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageTypeComponent } from './garbage-type.component';

describe('GarbageTypeComponent', () => {
  let component: GarbageTypeComponent;
  let fixture: ComponentFixture<GarbageTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
