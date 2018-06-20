import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeeditmodalComponent } from './typeeditmodal.component';

describe('TypeeditmodalComponent', () => {
  let component: TypeeditmodalComponent;
  let fixture: ComponentFixture<TypeeditmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeeditmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeeditmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
