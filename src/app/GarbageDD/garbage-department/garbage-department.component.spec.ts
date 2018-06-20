import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageDepartmentComponent } from './garbage-department.component';

describe('GarbageDepartmentComponent', () => {
  let component: GarbageDepartmentComponent;
  let fixture: ComponentFixture<GarbageDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
