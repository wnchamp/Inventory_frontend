import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageCategorymodalmoveComponent } from './garbage-categorymodalmove.component';

describe('GarbageCategorymodalmoveComponent', () => {
  let component: GarbageCategorymodalmoveComponent;
  let fixture: ComponentFixture<GarbageCategorymodalmoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageCategorymodalmoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageCategorymodalmoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
