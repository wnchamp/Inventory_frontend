import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageTypemodalmoveComponent } from './garbage-typemodalmove.component';

describe('GarbageTypemodalmoveComponent', () => {
  let component: GarbageTypemodalmoveComponent;
  let fixture: ComponentFixture<GarbageTypemodalmoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageTypemodalmoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageTypemodalmoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
