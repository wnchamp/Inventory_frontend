import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BintypeModaldeleteComponent } from './bintype-modaldelete.component';

describe('BintypeModaldeleteComponent', () => {
  let component: BintypeModaldeleteComponent;
  let fixture: ComponentFixture<BintypeModaldeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BintypeModaldeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BintypeModaldeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
