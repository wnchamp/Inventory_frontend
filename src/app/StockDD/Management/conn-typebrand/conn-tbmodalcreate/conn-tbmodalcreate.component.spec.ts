import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnTbmodalcreateComponent } from './conn-tbmodalcreate.component';

describe('ConnTbmodalcreateComponent', () => {
  let component: ConnTbmodalcreateComponent;
  let fixture: ComponentFixture<ConnTbmodalcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnTbmodalcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnTbmodalcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
