import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalrecylebinDeleteComponent } from './modalrecylebin-delete.component';

describe('ModalrecylebinDeleteComponent', () => {
  let component: ModalrecylebinDeleteComponent;
  let fixture: ComponentFixture<ModalrecylebinDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalrecylebinDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalrecylebinDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
