import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypedeletemodalComponent } from './typedeletemodal.component';

describe('TypedeletemodalComponent', () => {
  let component: TypedeletemodalComponent;
  let fixture: ComponentFixture<TypedeletemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypedeletemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypedeletemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
