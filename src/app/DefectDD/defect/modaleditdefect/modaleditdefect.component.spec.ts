import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleditdefectComponent } from './modaleditdefect.component';

describe('ModaleditdefectComponent', () => {
  let component: ModaleditdefectComponent;
  let fixture: ComponentFixture<ModaleditdefectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaleditdefectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaleditdefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
