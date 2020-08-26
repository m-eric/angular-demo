import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { FormPasswordUserComponent } from './form-password-user.component';

describe('FormPasswordUserComponent', () => {
  let component: FormPasswordUserComponent;
  let fixture: ComponentFixture<FormPasswordUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormPasswordUserComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPasswordUserComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      password: new FormControl(null),
      confirm: new FormControl(null),
    });
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Random password should be empty by default', () => {
    expect(component.randomPassword).toBeFalsy();
  });

  it('Random password button should generate alphanumeric password of min 8 chars', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    btn.nativeElement.click();
    expect(component.randomPassword).toMatch(/^[a-z0-9]{8,}$/i);
  });

  describe('When random password is generated', () => {
    it('Should populate "password" and "confirm" form values', () => {
      const btn = fixture.debugElement.query(By.css('button'));
      btn.nativeElement.click();
      expect(component.formGroup.get('password').value).toEqual(component.randomPassword);
      expect(component.formGroup.get('confirm').value).toEqual(component.randomPassword);
    });

    it('Should show random password', () => {
      const btn = fixture.debugElement.query(By.css('button'));
      btn.nativeElement.click();
      fixture.detectChanges();
      const span = fixture.debugElement.query(By.css('span'));
      expect(span.nativeElement.innerText.trim()).toEqual(
        component.randomPassword
      );
    });

    it('Manual input should reset random password and clear form values', () => {
      const btn = fixture.debugElement.query(By.css('button'));
      btn.nativeElement.click();
      const input = fixture.debugElement.query(By.css('input'));
      input.nativeElement.value = ' ';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.randomPassword).toBeFalsy();
      expect(component.formGroup.get('password').value).toBeFalsy();
      expect(component.formGroup.get('confirm').value).toBeFalsy();
    });
  });
});
