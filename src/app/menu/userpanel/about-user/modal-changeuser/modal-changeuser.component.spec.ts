import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeuserComponent } from './modal-changeuser.component';

describe('ModalChangeuserComponent', () => {
  let component: ModalChangeuserComponent;
  let fixture: ComponentFixture<ModalChangeuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangeuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
