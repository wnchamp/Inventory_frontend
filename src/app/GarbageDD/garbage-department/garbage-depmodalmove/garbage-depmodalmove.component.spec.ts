import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageDepmodalmoveComponent } from './garbage-depmodalmove.component';

describe('GarbageDepmodalmoveComponent', () => {
  let component: GarbageDepmodalmoveComponent;
  let fixture: ComponentFixture<GarbageDepmodalmoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageDepmodalmoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageDepmodalmoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
