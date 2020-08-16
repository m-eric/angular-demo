import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutActionComponent } from './logout-action.component';

describe('LogoutActionComponent', () => {
  let component: LogoutActionComponent;
  let fixture: ComponentFixture<LogoutActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
