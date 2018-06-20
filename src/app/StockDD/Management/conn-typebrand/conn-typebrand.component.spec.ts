import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnTypebrandComponent } from './conn-typebrand.component';

describe('ConnTypebrandComponent', () => {
  let component: ConnTypebrandComponent;
  let fixture: ComponentFixture<ConnTypebrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnTypebrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnTypebrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
