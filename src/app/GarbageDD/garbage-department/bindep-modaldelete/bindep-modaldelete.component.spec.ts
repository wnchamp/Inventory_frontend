import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindepModaldeleteComponent } from './bindep-modaldelete.component';

describe('BindepModaldeleteComponent', () => {
  let component: BindepModaldeleteComponent;
  let fixture: ComponentFixture<BindepModaldeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindepModaldeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindepModaldeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
