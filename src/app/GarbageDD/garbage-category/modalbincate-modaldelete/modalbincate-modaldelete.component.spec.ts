import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalbincateModaldeleteComponent } from './modalbincate-modaldelete.component';

describe('ModalbincateModaldeleteComponent', () => {
  let component: ModalbincateModaldeleteComponent;
  let fixture: ComponentFixture<ModalbincateModaldeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalbincateModaldeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbincateModaldeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
