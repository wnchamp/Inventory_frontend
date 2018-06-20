import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypecreatemodalComponent } from './typecreatemodal.component';

describe('TypecreatemodalComponent', () => {
  let component: TypecreatemodalComponent;
  let fixture: ComponentFixture<TypecreatemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypecreatemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypecreatemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
