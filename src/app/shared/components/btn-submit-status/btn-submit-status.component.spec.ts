import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { SpyLocation } from '@angular/common/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { BtnSubmitStatusComponent } from './btn-submit-status.component';

describe('BtnSubmitStatusComponent', () => {
  let component: BtnSubmitStatusComponent;
  let fixture: ComponentFixture<BtnSubmitStatusComponent>;
  let buttonEl: DebugElement;
  let locationMock: any;

  beforeEach(async(() => {
    locationMock = jasmine.createSpyObj('Location', ['back']);
    TestBed.configureTestingModule({
      declarations: [BtnSubmitStatusComponent],
      providers: [{ provide: Location, useValue: locationMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSubmitStatusComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.debugElement.query(By.css('button'));
  });

  describe('Default status', () => {
    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('Should have title "Сними"', () => {
      fixture.detectChanges();
      expect(buttonEl.nativeElement.textContent.trim()).toBe('Сними');
    });

    it('Should be enabled', () => {
      fixture.detectChanges();
      expect(buttonEl.nativeElement.disabled).toBe(false);
    });
  });

  describe('Loading status', () => {
    beforeEach(() => {
      component.status = 'loading';
    });

    it('Should show spinner', () => {
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('div > i.fa-spin'));
      expect(spinner).toBeTruthy();
    });

    it('Should be disabled', () => {
      fixture.detectChanges();
      expect(buttonEl.nativeElement.disabled).toBe(true);
    });
  });

  describe('Success status', () => {
    beforeEach(() => {
      component.status = 'success';
    });

    it('Should show success message', () => {
      fixture.detectChanges();
      const div = fixture.debugElement.query(By.css('div.flex > div'));
      expect(div.nativeElement.textContent).toContain('Снимљено');
    });

    it('Should show success icon', () => {
      fixture.detectChanges();
      const icon = fixture.debugElement.query(
        By.css('div.flex > div > i.fa-check')
      );
      expect(icon).toBeTruthy();
    });
  });

  describe('Error status', () => {
    beforeEach(() => {
      component.status = 'error';
    });

    it('Should show error message', () => {
      fixture.detectChanges();
      const div = fixture.debugElement.query(By.css('div.flex > div'));
      expect(div.nativeElement.textContent).toContain('Грешка');
    });

    it('Should show error icon', () => {
      fixture.detectChanges();
      const icon = fixture.debugElement.query(
        By.css('div.flex > div > i.fa-exclamation-triangle')
      );
      expect(icon).toBeTruthy();
    });
  });

  describe('Back button', () => {
    it('Should be hidden by default', () => {
      fixture.detectChanges();
      const back = fixture.debugElement.query(By.css('div.flex > div.ml-auto'));
      expect(back).toBeFalsy();
    });

    it('Should be hidden when set to "hide"', () => {
      component.backButton = 'hide';
      component.ngOnChanges();
      fixture.detectChanges();
      const back = fixture.debugElement.query(By.css('div.flex > div.ml-auto'));
      expect(back).toBeFalsy();
    });

    it('Should be shown when set to "show"', () => {
      component.backButton = 'show';
      component.ngOnChanges();
      fixture.detectChanges();
      const back = fixture.debugElement.query(By.css('div.flex > div.ml-auto'));
      expect(back).toBeTruthy();
    });

    it('Should be shown when set to "onSuccess" and btn status set to "success"', () => {
      component.backButton = 'onSuccess';
      component.status = 'success';
      component.ngOnChanges();
      fixture.detectChanges();
      const back = fixture.debugElement.query(By.css('div.flex > div.ml-auto'));
      expect(back).toBeTruthy();
    });

    it('Should navigate back on click', () => {
      component.backButton = 'show';
      component.ngOnChanges();
      fixture.detectChanges();
      const back = fixture.debugElement.query(By.css('div.flex > div.ml-auto'));
      back.nativeElement.click();
      expect(locationMock.back).toHaveBeenCalled();
    });
  });
});
