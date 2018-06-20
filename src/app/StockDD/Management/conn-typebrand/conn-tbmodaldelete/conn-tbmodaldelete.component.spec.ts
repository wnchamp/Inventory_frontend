import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnTbmodaldeleteComponent } from './conn-tbmodaldelete.component';

describe('ConnTbmodaldeleteComponent', () => {
  let component: ConnTbmodaldeleteComponent;
  let fixture: ComponentFixture<ConnTbmodaldeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnTbmodaldeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnTbmodaldeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
