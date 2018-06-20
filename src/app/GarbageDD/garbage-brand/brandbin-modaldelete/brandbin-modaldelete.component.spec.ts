import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandbinModaldeleteComponent } from './brandbin-modaldelete.component';

describe('BrandbinModaldeleteComponent', () => {
  let component: BrandbinModaldeleteComponent;
  let fixture: ComponentFixture<BrandbinModaldeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandbinModaldeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandbinModaldeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
