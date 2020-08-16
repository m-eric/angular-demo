import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSubmitStatusComponent } from './btn-submit-status.component';

describe('BtnSubmitStatusComponent', () => {
  let component: BtnSubmitStatusComponent;
  let fixture: ComponentFixture<BtnSubmitStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSubmitStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSubmitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
