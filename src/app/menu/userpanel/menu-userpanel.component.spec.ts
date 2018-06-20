import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUserpanelComponent } from './menu-userpanel.component';

describe('UserpanelComponent', () => {
  let component: MenuUserpanelComponent;
  let fixture: ComponentFixture<MenuUserpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuUserpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUserpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
