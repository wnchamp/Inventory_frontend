import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpadminpanelComponent } from './spadminpanel.component';

describe('SpadminpanelComponent', () => {
  let component: SpadminpanelComponent;
  let fixture: ComponentFixture<SpadminpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpadminpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpadminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
