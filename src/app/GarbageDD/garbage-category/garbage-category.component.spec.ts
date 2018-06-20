import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageCategoryComponent } from './garbage-category.component';

describe('GarbageCategoryComponent', () => {
  let component: GarbageCategoryComponent;
  let fixture: ComponentFixture<GarbageCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
