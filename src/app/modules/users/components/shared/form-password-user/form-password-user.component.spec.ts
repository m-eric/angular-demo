import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPasswordUserComponent } from './form-password-user.component';

describe('FormPasswordUserComponent', () => {
  let component: FormPasswordUserComponent;
  let fixture: ComponentFixture<FormPasswordUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPasswordUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPasswordUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
