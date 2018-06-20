import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageEmpmodalmoveComponent } from './garbage-empmodalmove.component';

describe('GarbageEmpmodalmoveComponent', () => {
  let component: GarbageEmpmodalmoveComponent;
  let fixture: ComponentFixture<GarbageEmpmodalmoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageEmpmodalmoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageEmpmodalmoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
