import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageBrandmodalmoveComponent } from './garbage-brandmodalmove.component';

describe('GarbageBrandmodalmoveComponent', () => {
  let component: GarbageBrandmodalmoveComponent;
  let fixture: ComponentFixture<GarbageBrandmodalmoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageBrandmodalmoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageBrandmodalmoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
