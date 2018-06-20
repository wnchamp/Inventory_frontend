import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypecomComponent } from './typecom.component';

describe('TypecomComponent', () => {
  let component: TypecomComponent;
  let fixture: ComponentFixture<TypecomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypecomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypecomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
