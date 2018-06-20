import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestforPurchseComponent } from './requestfor-purchse.component';

describe('RequestforPurchseComponent', () => {
  let component: RequestforPurchseComponent;
  let fixture: ComponentFixture<RequestforPurchseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestforPurchseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestforPurchseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
