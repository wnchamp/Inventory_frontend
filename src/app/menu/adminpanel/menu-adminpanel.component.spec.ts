import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdminpanelComponent } from './menu-adminpanel.component';

describe('AdminpanelComponent', () => {
  let component: MenuAdminpanelComponent;
  let fixture: ComponentFixture<MenuAdminpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAdminpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAdminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
