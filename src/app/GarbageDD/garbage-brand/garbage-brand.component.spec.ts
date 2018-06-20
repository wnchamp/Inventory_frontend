import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarbageBrandComponent } from './garbage-brand.component';

describe('GarbageBrandComponent', () => {
  let component: GarbageBrandComponent;
  let fixture: ComponentFixture<GarbageBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarbageBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarbageBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
